// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:

// const { BARBER_OF_SEVILLE_GAME } = require("./chessUtils");

// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    // image_url: '/customers/delba-de-oliveira.png',
    password: '123456',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    // image_url: '/customers/lee-robinson.png',
    password: '123456',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    // image_url: '/customers/hector-simpson.png',
    password: '123456',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Steven Tey',
    email: 'steven@tey.com',
    // image_url: '/customers/steven-tey.png',
    password: '123456',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    // image_url: '/customers/steph-dietz.png',
    password: '123456',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    // image_url: '/customers/michael-novotny.png',
    password: '123456',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    // image_url: '/customers/evil-rabbit.png',
    password: '123456',
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    name: 'Emil Kowalski',
    email: 'emil@kowalski.com',
    // image_url: '/customers/emil-kowalski.png',
    password: '123456',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    // image_url: '/customers/amy-burns.png',
    password: '123456',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    // image_url: '/customers/balazs-orban.png',
    password: '123456',
  },
];

const customers = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    image_url: '/customers/hector-simpson.png',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Steven Tey',
    email: 'steven@tey.com',
    image_url: '/customers/steven-tey.png',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    image_url: '/customers/steph-dietz.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    name: 'Emil Kowalski',
    email: 'emil@kowalski.com',
    image_url: '/customers/emil-kowalski.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];


const BARBER_OF_SEVILLE_GAME = {
  "moves": [
      {"moveNumber": 1, "white": "e4", "black": "e5"},
      {"moveNumber": 2, "white": "Nf3", "black": "d6"},
      {"moveNumber": 3, "white": "d4", "black": "Bg4"},
      {"moveNumber": 4, "white": "d4xe5", "black": "Bxf3"},
      {"moveNumber": 5, "white": "Qxf3", "black": "d6xe5"},
      {"moveNumber": 6, "white": "Bc4", "black": "Nf6"},
      {"moveNumber": 7, "white": "Qb3", "black": "Qe7"},
      {"moveNumber": 8, "white": "Nc3", "black": "c6"},
      {"moveNumber": 9, "white": "Bg5", "black": "b5"},
      {"moveNumber": 10, "white": "Nxb5", "black": "c6xb5"},
      {"moveNumber": 11, "white": "Bxb5+", "black": "Nd7"},
      {"moveNumber": 12, "white": "0-0-0", "black": "Rd8"},
      {"moveNumber": 13, "white": "Rxd7", "black": "Rxd7"},
      {"moveNumber": 14, "white": "Rd1", "black": "Qe6"},
      {"moveNumber": 15, "white": "Bxd7+", "black": "Nxd7"},
      {"moveNumber": 16, "white": "Qb8+", "black": "Nxb8"},
      {"moveNumber": 17, "white": "Rd8#", "black": ""}
  ]
}

const OPERA_GAME_FEN = '1n1Rkb1r/p4pppp/4q3/4p1B1/4P3/8/PPP2PPP/2K5 b - - 0 1'

const games = [
  {
    id: 'game-001',
    white_player_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a', // User as white
    black_player_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a', // Lee Robinson as black
    move_history: JSON.stringify(BARBER_OF_SEVILLE_GAME),
    created_at: new Date('2023-01-02T12:00:00Z'),
    updated_at: new Date('2023-01-02T12:30:00Z'),
    status: 'white-win',
    fen: OPERA_GAME_FEN, // Forsyth-Edwards Notation (FEN) 
  },
  {
    id: 'game-002',
    white_player_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    black_player_id: '3958dc9e-737f-4377-85e9-fec4b6a6442a', // Hector Simpson as black
    move_history: JSON.stringify(BARBER_OF_SEVILLE_GAME),
    created_at: new Date('2023-01-03T12:00:00Z'),
    updated_at: new Date('2023-01-03T12:30:00Z'),
    status: 'white-win',
    fen: OPERA_GAME_FEN,
  },
  {
    id: 'game-003',
    white_player_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    black_player_id: '3958dc9e-787f-4377-85e9-fec4b6a6442a', // Steph Dietz as black
    move_history: JSON.stringify(BARBER_OF_SEVILLE_GAME),
    created_at: new Date('2023-01-04T12:00:00Z'),
    updated_at: new Date('2023-01-04T12:30:00Z'),
    status: 'white-win',
    fen: OPERA_GAME_FEN,
  },
  {
    id: 'game-004',
    white_player_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    black_player_id: '76d65c26-f784-44a2-ac19-586678f7c2f2', // Michael Novotny as black
    move_history: JSON.stringify(BARBER_OF_SEVILLE_GAME),
    created_at: new Date('2023-01-05T12:00:00Z'),
    updated_at: new Date('2023-01-05T12:30:00Z'),
    status: 'white-win',
    fen: OPERA_GAME_FEN,
  },
  {
    id: 'game-005',
    white_player_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    black_player_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa', // Evil Rabbit as black
    move_history: JSON.stringify(BARBER_OF_SEVILLE_GAME),
    created_at: new Date('2023-01-06T12:00:00Z'),
    updated_at: new Date('2023-01-06T12:30:00Z'),
    status: 'white-win',
    fen: OPERA_GAME_FEN,
  },
  {
    id: 'game-006',
    white_player_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    black_player_id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66', // Emil Kowalski as black
    move_history: JSON.stringify(BARBER_OF_SEVILLE_GAME),
    created_at: new Date('2023-01-07T12:00:00Z'),
    updated_at: new Date('2023-01-07T12:30:00Z'),
    status: 'white-win',
    fen: OPERA_GAME_FEN,
  },
]

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[7].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[6].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-18',
  },
  {
    customer_id: customers[0].id,
    amount: 8945,
    status: 'paid',
    date: '2023-10-04',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

module.exports = {
  users,
  games,
  customers,
  invoices,
  revenue,
};
