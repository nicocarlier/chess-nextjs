const { v4: uuidv4 } = require('uuid');


const demoUser =   {
  id: uuidv4(),
  name: 'Demo User',
  email: 'user@nextmail.com',
  image_url: null,
  password: '123456',
}

// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  demoUser,
  {
    id: uuidv4(),
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/users/delba-de-oliveira.png',
    password: '123456',
  },
  {
    id: uuidv4(),
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/users/lee-robinson.png',
    password: '123456',
  },
  {
    id: uuidv4(),
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    image_url: '/users/hector-simpson.png',
    password: '123456',
  },
  {
    id: uuidv4(),
    name: 'Steven Tey',
    email: 'steven@tey.com',
    image_url: '/users/steven-tey.png',
    password: '123456',
  },
  {
    id: uuidv4(),
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    image_url: '/users/steph-dietz.png',
    password: '123456',
  },
  {
    id: uuidv4(),
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/users/michael-novotny.png',
    password: '123456',
  },
  {
    id: uuidv4(),
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/users/evil-rabbit.png',
    password: '123456',
  },
  {
    id: uuidv4(),
    name: 'Emil Kowalski',
    email: 'emil@kowalski.com',
    image_url: '/users/emil-kowalski.png',
    password: '123456',
  },
  {
    id: uuidv4(),
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/users/amy-burns.png',
    password: '123456',
  },
  {
    id: uuidv4(),
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/users/balazs-orban.png',
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


const bots = [
  {
    id: uuidv4(),
    name: 'Randomizer',
    description: "\"I bet you can't predict what I'll do next!\" The Randomizer uses an algorithm that creates completely random moves. They have the element of surprise, but can you take them down?"
  },
  {
    id: uuidv4(),
    name: 'Novice Knight',
    description: "\"Just starting my journey.\" Novice Knight operates at a shallow depth, making it ideal for beginners looking to learn the ropes without feeling overwhelmed."
  },
  {
    id: uuidv4(),
    name: 'Intermediate Invader',
    description: "\"Growing stronger.\" Intermediate Invader takes things a step further, offering a challenge for players looking to test their skills with a bit more depth."
  },
  {
    id: uuidv4(),
    name: 'Advanced Archer',
    description: "\"Aiming high.\" Advanced Archer represents a significant step up, capable of deeper calculations for those seeking to refine their strategy against a challenging opponent."
  },
  {
    id: uuidv4(),
    name: 'Mastermind Maverick',
    description: "\"Strategy is my middle name.\" Mastermind Maverick delves deeper into the game's complexities, providing a formidable challenge for experienced players."
  },
  {
    id: uuidv4(),
    name: 'Grandmaster Guardian',
    description: "\"At the pinnacle of chess thought.\" Grandmaster Guardian operates at the deepest levels Stockfish can offer, simulating the insight and foresight of a grandmaster's play."
  }
]


const BARBER_OF_SEVILLE_GAME = {
  "moves": [
      {"moveNumber": 1, "white": "e4", "black": "e5",
      "fen-white": "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
      "fen-black": "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 1"},
      {"moveNumber": 2, "white": "Nf3", "black": "d6",
      "fen-white": "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 0 1",
      "fen-black": "rnbqkbnr/ppp2ppp/3p4/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 1"},
      {"moveNumber": 3, "white": "d4", "black": "Bg4",
      "fen-white": "rnbqkbnr/ppp2ppp/3p4/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq d3 0 1",
      "fen-black": "rn1qkbnr/ppp2ppp/3p4/4p3/3PP1b1/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 1"},
      {"moveNumber": 4, "white": "d4xe5", "black": "Bxf3",
      "fen-white": "rn1qkbnr/ppp2ppp/3p4/4P3/4P1b1/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 1",
      "fen-black": "rn1qkbnr/ppp2ppp/3p4/4P3/4P3/5b2/PPP2PPP/RNBQKB1R w KQkq - 0 1"},
      {"moveNumber": 5, "white": "Qxf3", "black": "d6xe5",
      "fen-white": "rn1qkbnr/ppp2ppp/3p4/4P3/4P3/5Q2/PPP2PPP/RNB1KB1R b KQkq - 0 1",
      "fen-black": "rn1qkbnr/ppp2ppp/8/4p3/4P3/5Q2/PPP2PPP/RNB1KB1R w KQkq - 0 1"},
      {"moveNumber": 6, "white": "Bc4", "black": "Nf6",
      "fen-white": "rn1qkbnr/ppp2ppp/8/4p3/2B1P3/5Q2/PPP2PPP/RNB1K2R b KQkq - 0 1",
      "fen-black": "rn1qkb1r/ppp2ppp/5n2/4p3/2B1P3/5Q2/PPP2PPP/RNB1K2R w KQkq - 0 1"},
      {"moveNumber": 7, "white": "Qb3", "black": "Qe7",
      "fen-white": "rn1qkb1r/ppp2ppp/5n2/4p3/2B1P3/1Q6/PPP2PPP/RNB1K2R b KQkq - 0 1",
      "fen-black": "rn2kb1r/ppp1qppp/5n2/4p3/2B1P3/1Q6/PPP2PPP/RNB1K2R w KQkq - 0 1"},
      {"moveNumber": 8, "white": "Nc3", "black": "c6",
      "fen-white": "rn2kb1r/ppp1qppp/5n2/4p3/2B1P3/1QN5/PPP2PPP/R1B1K2R b KQkq - 0 1",
      "fen-black": "rn2kb1r/pp2qppp/2p2n2/4p3/2B1P3/1QN5/PPP2PPP/R1B1K2R w KQkq - 0 1"},
      {"moveNumber": 9, "white": "Bg5", "black": "b5",
      "fen-white": "rn2kb1r/pp2qppp/2p2n2/4p1B1/2B1P3/1QN5/PPP2PPP/R3K2R b KQkq - 0 1",
      "fen-black": "rn2kb1r/p3qppp/2p2n2/1p2p1B1/2B1P3/1QN5/PPP2PPP/R3K2R w KQkq b6 0 1"},
      {"moveNumber": 10, "white": "Nxb5", "black": "c6xb5",
      "fen-white": "rn2kb1r/p3qppp/2p2n2/1N2p1B1/2B1P3/1Q6/PPP2PPP/R3K2R b KQkq - 0 1",
      "fen-black": "rn2kb1r/p3qppp/5n2/1p2p1B1/2B1P3/1Q6/PPP2PPP/R3K2R w KQkq - 0 1"},
      {"moveNumber": 11, "white": "Bxb5+", "black": "Nd7",
      "fen-white": "rn2kb1r/p3qppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/R3K2R b KQkq - 0 1",
      "fen-black": "r3kb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/R3K2R w KQkq - 0 1"},
      {"moveNumber": 12, "white": "0-0-0", "black": "Rd8",
      "fen-white": "r3kb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR3R w kq - 0 1",
      "fen-black": "3rkb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR3R w kq - 0 1"},
      {"moveNumber": 13, "white": "Rxd7", "black": "Rxd7",
      "fen-white": "3rkb1r/p2Rqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2K4R w kq - 0 1",
      "fen-black": "4kb1r/p2rqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2K4R w kq - 0 1"},
      {"moveNumber": 14, "white": "Rd1", "black": "Qe6",
      "fen-white": "4kb1r/p2rqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR4 w kq - 0 1",
      "fen-black": "4kb1r/p2r1ppp/4qn2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR4 w kq - 0 1"},
      {"moveNumber": 15, "white": "Bxd7+", "black": "Nxd7",
      "fen-white": "4kb1r/p2B1ppp/4qn2/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w kq - 0 1",
      "fen-black": "4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w kq - 0 1"},
      {"moveNumber": 16, "white": "Qb8+", "black": "Nxb8",
      "fen-white": "1Q2kb1r/p2n1ppp/4q3/4p1B1/4P3/8/PPP2PPP/2KR4 w kq - 0 1",
      "fen-black": "1n2kb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2KR4 w kq - 0 1"},
      {"moveNumber": 17, "white": "Rd8#", "black": "",
      "fen-white": "1n1Rkb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2K5 w kq - 0 1",
      "fen-black": ""}
  ]
}

const OPERA_GAME_FEN = '1n1Rkb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2K5 b - - 0 1'


const humanIds = users.filter((user)=>user.name !== 'Demo User').map(user => user.id);
const botIds = bots.map(bot => bot.id);
const possibleOpponentIds = [...humanIds, ...botIds];
function selectRandomOpponent() {
  const n = Math.floor(Math.random() * possibleOpponentIds.length);
  return possibleOpponentIds[n];
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomSideAndWinner() {
  const sides = ['white', 'black'];
  const demoUserSide = sides[Math.floor(Math.random() * sides.length)];
  const winner = sides[Math.floor(Math.random() * sides.length)];
  return { demoUserSide, winner };
}

const games = [];

for (let i = 0; i < 20; i++) {
  const { demoUserSide, winner } = randomSideAndWinner();
  const opponentId = selectRandomOpponent();
  const createdAt = randomDate(new Date(2022, 0, 1), new Date(2023, 0, 1));
  const updatedAt = new Date(createdAt.getTime() + 30 * 60 * 1000); // 30 minutes later

  games.push({
    id: uuidv4(),
    white_player_id: demoUserSide === 'white' ? demoUser.id : opponentId,
    black_player_id: demoUserSide === 'black' ? demoUser.id : opponentId,
    move_history: JSON.stringify(BARBER_OF_SEVILLE_GAME),
    created_at: createdAt,
    updated_at: updatedAt,
    status: winner + '-win',
    fen: OPERA_GAME_FEN,
  });
}

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
  demoUser, 
  users,
  games,
  customers,
  invoices,
  revenue,
  bots, 
  humanIds
};
