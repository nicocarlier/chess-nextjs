// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
import { Board as BoardClass } from "@/app/lib/chessClasses/board"

export type SeedUserNames = 'Delba de Oliveira' | 'Lee Robinson' | 'Hector Simpson' | 'Steven Tey' | 'Steph Dietz' | 'Michael Novotny' | 'Evil Rabbit' | 'Emil Kowalski' | 'Amy Burns' | 'Balazs Orban';

export type User = {
  id: string;
  name: string;
  email: string;
  image_url: string | null;
  password: string;
};

export type Friendship = {
  id: string;
  user1: string;
  user2: string;
};

export type Move = {
  moveNumber: number;
  white: string;
  black: string;
  fenWhite: string;
  fenBlack?: string;
};

export type MoveHistory = {
  moves: Move[];
};


export type Game = {
  id: string;
  white_player_id: string;
  black_player_id: string;
  move_history: MoveHistory;
  created_at: Date;
  updated_at: Date; 
  status: 'white-win' | 'black-win' | 'draw' | 'underway';
  fen: string;
};



export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type GamesTable = {
  id: string;
  created_at: Date;
  result: 'win' | 'loss' | 'draw';
  fen: string;
  opponent_name: string;
  opponent_id: string;
  duration: number;
  moves: string;
};


export type BotNames = 'Randomizer' | 'Novice Knight' | 'Intermediate Invader' | 'Advanced Archer' | 'Mastermind Maverick' | 'Grandmaster Guardian';

export type Bot = {
  id: string;
  name: string;
  description: string;
  rating?: number;
};


export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};


export type TimeControlCategories = {
  [category: string]: string[];
};

export const timeControls: TimeControlCategories = {
  'Bullet': ['1|0', '1|1', '2|1'],
  'Blitz': ['3|0', '3|2', '5|0'],
  'Rapid': ['10|0', '15|10', '30|0'],
  'No Limit': ['inf'],
};

export type ChessBot = {
  id: string;
  name: string;
  description: string;
  rating: number;
};


//  CUSTOM CLASSES:

export type BoardType = typeof BoardClass;