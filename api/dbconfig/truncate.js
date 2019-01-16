import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const client = new Client({
  connectionString,
});
console.log(connectionString);
client.connect((err) => {
  if (err) {
    console.log(err.message);
    client.end();
  } else {
    console.log(`connection to ${connectionString} server established`);
  }
});

const truncateUserTableQuery = 'TRUNCATE TABLE users';

const tableQuery = `${truncateUserTableQuery}`;
client.query(tableQuery, (error) => {
  client.end();
  if (error) {
    console.log(error.message);
    return;
  }
  console.log('Truncate tables before each test run');
});
