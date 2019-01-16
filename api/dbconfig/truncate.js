import dotenv from 'dotenv';
import { Client } from 'pg';
import dbconfig from './database';

dotenv.config();

const connectionString = dbconfig.development;
const client = new Client({
  connectionString,
});
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
