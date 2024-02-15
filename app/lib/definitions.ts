// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

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

export type Game = {
  id: string;
  white_player_id: string; // Foreign key to User.id
  black_player_id: string; // Foreign key to User.id
  move_history: string; // Consider storing as JSON or a string that can be easily parsed
  created_at: Date; // Timestamp for when the game was created
  updated_at: Date; // Timestamp for the last update (e.g., last move)
  status: 'white-win' | 'black-win' | 'draw' | 'underway'; // Outcome of the game
  fen: string; // The current (or final) FEN string representing the game state 
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
};


export type BotNames = 'randomizer' | 'Novice Knight' | 'Intermediate Invader' | 'Advanced Archer' | 'Mastermind Maverick' | 'Grandmaster Guardian';

export type Bot = {
  id: string;
  name: string;
  description: string;
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

export const chessBots: ChessBot[] = [
  {
    id: 'bot-1',
    name: 'AlphaPawn',
    description: 'A beginner-friendly bot with a knack for opening mistakes.',
    rating: 800,
  },
  {
    id: 'bot-2',
    name: 'KnightHawk',
    description: 'Intermediate level bot that loves tactical skirmishes.',
    rating: 1200,
  },
  {
    id: 'bot-3',
    name: 'BishopBane',
    description: 'Advanced bot with a strategic depth, preferring long positional games.',
    rating: 1600,
  },
  {
    id: 'bot-4',
    name: 'RookRoll',
    description: 'Expert bot that dominates the open files and ranks with precision.',
    rating: 2000,
  },
  {
    id: 'bot-5',
    name: 'QueenGambit',
    description: 'Master level bot, challenging the best players with unpredictable moves.',
    rating: 2400,
  },
];
