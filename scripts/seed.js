const { db } = require('@vercel/postgres');
const {
  invoices,
  customers,
  revenue,
  users,
  games
} = require('../app/lib/demo-user-data.js');
const bcrypt = require('bcrypt');


async function dropTables(client) {
    try {
      console.log(`Dropping all tables...`);
      await client.query('DROP TABLE IF EXISTS users, games, customers, invoices, revenue, friendships CASCADE;');
      console.log('Dropped all tables');
    } catch (error) {
      console.error('Error dropping tables:', error);
      throw error;
    }
}


async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        image_url TEXT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, image_url, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${user.image_url}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}


// ! SEED GAMES
async function seedGames(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "games" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS games (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    white_player_id UUID NOT NULL,
    black_player_id UUID NOT NULL,
    move_history TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(255) NOT NULL CHECK (status IN ('white-win', 'black-win', 'draw', 'underway')),
    fen VARCHAR(255) NOT NULL
  );
`;

    console.log(`Created "games" table`);

    // Insert data into the "games" table
    const insertedGames = await Promise.all(
      games.map(
        (game) => client.sql`
        INSERT INTO games (white_player_id, black_player_id, move_history, created_at, updated_at, status, fen)
        VALUES (${game.white_player_id}, ${game.black_player_id}, ${game.move_history}, 
          ${game.created_at}, ${game.updated_at}, ${game.status}, ${game.fen})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedGames.length} games`);

    return {
      createTable,
      games: insertedGames,
    };
  } catch (error) {
    console.error('Error seeding games:', error);
    throw error;
  }
}
// ! SSEDED GAMES

async function seedFriendships(client) {
  const demoUserId = '410544b2-4001-4271-9855-fec4b6a6442a';
  const friendUserIds = [
    '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    '50ca3e18-62cd-11ee-8c99-0242ac120002',
    '76d65c26-f784-44a2-ac19-586678f7c2f2',
    'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
  ];


  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "games" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS friendships (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user1 UUID NOT NULL,
        user2 UUID NOT NULL,
        CONSTRAINT fk_user1 FOREIGN KEY (user1) REFERENCES users(id),
        CONSTRAINT fk_user2 FOREIGN KEY (user2) REFERENCES users(id),
        CONSTRAINT unique_friendship UNIQUE (user1, user2)
      );
    `;

    console.log(`Created "friencships" table`);


    const insertedFriendships = await Promise.all(
      friendUserIds.map(userId => {
        return client.sql`
          INSERT INTO friendships (user1, user2)
          VALUES (${demoUserId}, ${userId})
          ON CONFLICT (user1, user2) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedFriendships.length} friendships`);
  } catch (error) {
    console.error('Error seeding friendships:', error);
    throw error;
  }
}



async function seedInvoices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL,
    amount INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    date DATE NOT NULL
  );
`;

    console.log(`Created "invoices" table`);

    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedCustomers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "customers" table`);

    // Insert data into the "customers" table
    const insertedCustomers = await Promise.all(
      customers.map(
        (customer) => client.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedCustomers.length} customers`);

    return {
      createTable,
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error('Error seeding customers:', error);
    throw error;
  }
}

async function seedRevenue(client) {
  try {
    // Create the "revenue" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `;

    console.log(`Created "revenue" table`);

    // Insert data into the "revenue" table
    const insertedRevenue = await Promise.all(
      revenue.map(
        (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedRevenue.length} revenue`);

    return {
      createTable,
      revenue: insertedRevenue,
    };
  } catch (error) {
    console.error('Error seeding revenue:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await dropTables(client);
  await seedUsers(client);
  await seedGames(client);
  await seedCustomers(client);
  await seedInvoices(client);
  await seedRevenue(client);
  await seedFriendships(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
