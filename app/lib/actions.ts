'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth, signIn, signOut } from '@/auth';
import { AuthError, User } from 'next-auth';

import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'

import { GAME_START_FEN } from './chessUtils';
import { fetchCurrentUser, getUser } from './data';
import { Bot, Game, Move, MoveHistory } from './definitions';
import { ChessBoard } from './chessClasses/chessBoard';



const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
      invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
      .number()
      .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'],{
      invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });


// This is temporary until @types/react-dom is updated
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};
 
export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
 
  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
 
  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/play/invoices');
  redirect('/play/invoices');
}



const GameFormSchema = z.object({
  id: z.string(),
  botId: z.string(),
  selectedColor: z.string(),
  date: z.string(),
});

const CreateBotGame = GameFormSchema.omit({ id: true, date: true });

export type GameState = {
  errors?: {
    botId?: string[];
    selectedColor?: string[];
  };
  message?: string | null;
};
 
 
export async function createBotGame(prevState: GameState, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateBotGame.safeParse({
    botId: formData.get('botId'),
    selectedColor: formData.get('selectedColor'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
 
  const { botId, selectedColor } = validatedFields.data;
  const date = new Date();
  const user = await fetchCurrentUser();

  let whitePlayerId;
  let blackPlayerId;
  if (selectedColor === "white"){
    whitePlayerId = user.id;
    blackPlayerId = botId;
  }else {
    blackPlayerId = user.id;
    whitePlayerId = botId;
  }

  const initialMoveHistory = JSON.stringify({ "moves": [] });

  let createdGame;
  try {

    createdGame = await sql`
      INSERT INTO games (white_player_id, black_player_id, move_history, created_at, updated_at, status, fen)
      VALUES (${whitePlayerId}, ${blackPlayerId}, ${initialMoveHistory}, ${date.toISOString()}, ${date.toISOString()}, 'underway', ${GAME_START_FEN})
      RETURNING id, white_player_id, black_player_id
    `;
    
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  const gameId = createdGame.rows[0].id;
 
  // Revalidate the cache for the game page and redirect the user.
  revalidatePath('/game-history');
  redirect(`/play/${gameId}`);
}

export const fetchBotMove = async (fenString: string, opponent: Bot) => {

  if (opponent.name === "Randomizer"){
    const chessBoard = new ChessBoard(fenString);
    const [piece, endSquare] = chessBoard.getRandomMove();
    const piecePosition = piece.getPos();
    return [piecePosition, endSquare];
  } else {
    throw new Error('Don\`t have the API for this Bot yet');
  }

}



export async function updateGameMoveHistory(id: string, newMoveHistory: Move[],fenAfterMove: string) {
    try {
      const moveHistory = JSON.stringify({moves: newMoveHistory});
    await sql`
      UPDATE games
      SET move_history = ${moveHistory}, fen = ${fenAfterMove}, updated_at = ${new Date().toISOString()}
      WHERE id = ${id}
    `;
  } catch (error) {
      throw new Error('Database Error: Failed to Create User.');
  }
 
  revalidatePath(`/dashboard/play/${id}`);
}










const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
 
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
 
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  // throw new Error('Failed to Delete Invoice');
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {

    console.log("signing user in the databse.... ")

    console.log("formdata: ", formData)
    // debugger
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function signOutServerSide() {
  // 'use server';
  await signOut();
}


export async function searchForUser(email: string): Promise<User | undefined>{
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}



// export async function signUpNewUser(
//   formData: FormData,
//   prevState: string | undefined,
// ) {
//   try {

//     console.log("signing up a new user ....")

//     await createUser(formData);

//     console.log("signing the new user in ....")

//     await signIn('credentials', formData);

//     console.log("success!")

//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         default:
//           return 'Something went wrong.';
//       }
//     }
//     throw error;
//   }
//   return true;
// }


const signUpSchema = z.object({
  email: z.string().email().min(1, { message: 'Please enter a valid email.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  name: z.string()
});

export type SignUpState = {
  errors?: {
    email?: string[];
    password?: string[];
    name?: string[];
  };
  message?: string | null;
};


export async function signUpNewUser(prevState: SignUpState, formData: FormData) {
  try {

    console.log("signing user in the databse.... ")

    console.log("signing up a new user ....")

    // await createUser(formData);


    const validatedFields = signUpSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
      name: formData.get('name'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      // return {
      //   errors: validatedFields.error.flatten().fieldErrors,
      //   message: 'Missing Fields. Failed to Create User.',
      // };
      return 'Something went wrong.'
    }

    const { name, email, password } = validatedFields.data;

    console.log("name ", name)
    console.log("email ", email)
    console.log("password ", password)

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("inserting user into the databse.... ")

    await sql`
      INSERT INTO users (id, name, email, image_url, password)
      VALUES (${uuidv4()}, ${name}, ${email}, ${null}, ${hashedPassword})
      ON CONFLICT (id) DO NOTHING;
    `;
    // debugger
    await signIn('credentials', formData);


  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}





// export async function createUser(prevState: SignUpState, formData: FormData) {

//   console.log("creating user ...")

//   console.log("formData: ", formData)

//   const validatedFields = signUpSchema.safeParse({
//     email: formData.get('email'),
//     password: formData.get('password'),
//     name: formData.get('name'),
//   });

//   // If form validation fails, return errors early. Otherwise, continue.
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to Create User.',
//     };
//   }

//   const { name, email, password } = validatedFields.data;

//   console.log("name ", name)
//   console.log("email ", email)
//   console.log("password ", password)

//   const hashedPassword = await bcrypt.hash(password, 10);

//   console.log("inserting user into the databse.... ")

//   // Insert data into the database
//   try {
//     await sql`
//       INSERT INTO users (id, name, email, image_url, password)
//       VALUES (${uuidv4()}, ${name}, ${email}, ${null}, ${hashedPassword})
//       ON CONFLICT (id) DO NOTHING;
//     `;
//   } catch (error) {
//     throw new Error('Database Error: Failed to Create User.');
//   }
  
//     // Revalidate the cache for a page and redirect the user if needed
//     // revalidatePath('/account');
//     // redirect('/play');
//   }
// }