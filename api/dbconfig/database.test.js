import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

const { DATABASE_TEST_URL } = process.env;
const connectionString = DATABASE_TEST_URL;
const client = new Client({
  connectionString,
});
client.connect((err) => {
  if (err) {
    console.log(err.message);
    client.end();
  } else {
    console.log('connection successful');
  }
});
const dropUserTable = 'DROP TABLE users';
const userTableQuery = `DROP TABLE IF EXISTS users cascade;
CREATE TABLE users(id SERIAL PRIMARY KEY, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255), othername VARCHAR(255), email VARCHAR(225) UNIQUE NOT NULL, phoneNumber VARCHAR(255), username VARCHAR(255), password TEXT NOT NULL, isAdmin VARCHAR(255), created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;

const createTestUser = `INSERT INTO users(firstname, lastname, othername, email, phoneNumber, username, password, isAdmin, created_at, updated_at)
VALUES('test', 'tester', 'testest', 'tester@questioner.com', '08097012219', 'Bluebird2000', '$2a$10$HlG7pZklq8YqxvCmj6JNxuM9Gwuk/5cRzt4uARUNIJVqUNWlxBtQS', 'true', NOW(), NOW())`;
const tableQuery = `${dropUserTable} ; ${userTableQuery} ; ${createTestUser}`;
client.query(tableQuery, (error) => {
  client.end();
  if (error) {
    console.log(error.message);
    return;
  }
  console.log('Database migration was successful');
});
