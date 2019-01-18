import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connectionString;

if (process.env.NODE_ENV === 'development') {
  connectionString = process.env.DATABASE_URL;
  console.log(connectionString);
} else if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.DATABASE_TEST_URL;
  console.log(connectionString);
}

const pool = new Pool({
  connectionString,
});

const truncateUserTableQuery = 'TRUNCATE TABLE users';

const tableQuery = `${truncateUserTableQuery}`;
pool.query(tableQuery, (error) => {
  pool.end();
  if (error) {
    console.log(error.message);
    return;
  }
  console.log('Truncate tables before each test run');
});
