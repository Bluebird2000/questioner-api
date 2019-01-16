import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();
let connectionString;

const dbconfig = {
  development: process.env.DATABASE_URL,
  test: process.env.DATABASE_TEST_URL,
};

if (process.env.NODE_ENV === 'development') {
  connectionString = dbconfig.development;
  console.log(connectionString);
} else if (process.env.NODE_ENV === 'test') {
  connectionString = dbconfig.test;
  console.log(connectionString, 'oo');
}
const client = new Client({
  connectionString,
});
client.connect((err) => {
  if (err) {
    console.log(err.message);
    client.end();
  } else {
    console.log('connection to server established');
  }
});

const userTableQuery = `DROP TABLE IF EXISTS users cascade;
        CREATE TABLE users(
          id SERIAL PRIMARY KEY,
          firstname VARCHAR(255) NOT NULL, 
          lastname VARCHAR(255), 
          othername VARCHAR(255), 
          email VARCHAR(225) UNIQUE NOT NULL, 
          phoneNumber VARCHAR(255), 
          username VARCHAR(255), 
          password TEXT NOT NULL, 
          isAdmin VARCHAR(255), 
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;

const createTestUser = `INSERT INTO users(
          firstname, 
          lastname, 
          othername, 
          email, 
          phoneNumber, 
          username, 
          password, 
          isAdmin, 
          created_at, 
          updated_at
          )
          VALUES(
          'test', 
          'tester', 
          'testest', 
          'tester@questioner.com', 
          '08097012219', 
          'Bluebird2000', 
          '$2a$10$HlG7pZklq8YqxvCmj6JNxuM9Gwuk/5cRzt4uARUNIJVqUNWlxBtQS', 
          'true', 
          NOW(), 
          NOW()
          )`;

const meetupTableQuery = `DROP TABLE IF EXISTS meetups cascade;
        CREATE TABLE meetups(
          meetup_id SERIAL PRIMARY KEY, 
          location VARCHAR(255) NOT NULL, 
          topic VARCHAR(255) UNIQUE NOT NULL, 
          happeningOn VARCHAR(255), 
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          )`;

const createTestMeetup = `INSERT INTO meetups(
          location, 
          topic, 
          happeningOn, 
          created_at, 
          updated_at
          )
          VALUES(
          'Ojodu Berger', 
          'React summit', 
          '2019-01-03', NOW(), 
          NOW()
          )`;

const tableQuery = `${userTableQuery} ; ${createTestUser} ; ${meetupTableQuery} ; ${createTestMeetup}`;
client.query(tableQuery, (error) => {
  client.end();
  if (error) {
    console.log(error.message);
    return;
  }
  console.log('Database migration successful');
});

export default dbconfig;
