'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { GAME_START_FEN } from './chessUtils';

// import { getSession } from 'next-auth/react';


// const userId = fetchUserId();
const userId = '410544b2-4001-4271-9855-fec4b6a6442a';

import { auth, signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { getUser } from './data';



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
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}





const CreateGameInput = z.object({
  botId: z.string(),
  timeControl: z.string(),
  selectedColor: z.enum(['white', 'black']),
});

export async function createGame(formData: FormData) {
  const { botId, timeControl, selectedColor } = CreateGameInput.parse({
      botId: formData.get('botId'),
      timeControl: formData.get('timeControl'),
      selectedColor: formData.get('selectedColor'), // Ensure this matches the form's field name
  });

  // Determine player IDs based on selected color
  const whitePlayerId = selectedColor === 'white' ? userId : botId;
  const blackPlayerId = selectedColor === 'black' ? userId : botId;

  // Initial move history setup
  const initialMoveHistory = JSON.stringify({ "moves": [] });

  // Current date and time for created_at and updated_at fields
  const dateNow = new Date();

  // Insert the new game record into the database
  await sql`
      INSERT INTO games (white_player_id, black_player_id, move_history, created_at, updated_at, status, fen)
      VALUES (${whitePlayerId}, ${blackPlayerId}, ${initialMoveHistory}, ${dateNow.toISOString()}, ${dateNow.toISOString()}, 'underway', ${GAME_START_FEN})
  `;

  revalidatePath('/dashboard/invoices');
  // redirect('/dashboard/invoices');
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



// export async function getSessionUser() {
//   const session = await getSession()
//   const user = session?.user

//   return user
// }
