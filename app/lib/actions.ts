'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { GAME_START_FEN } from './chessUtils';

import { auth, signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { fetchCurrentUser, getUser } from './data';
import { Bot, Game, Move, MoveHistory } from './definitions';
import { ChessBoard } from './chessClasses/chessBoard';
import { signOut } from '@/auth';



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
    const piecePosition = piece.getSquare();
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
    return { message: 'Database Error: Failed to Update Game.' };
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
    // console.log("formdata: ", formData)
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