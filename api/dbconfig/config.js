import dotenv from 'dotenv';

dotenv.config();
let connectionString;


if (process.env.NODE_ENV === 'development') {
  connectionString = process.env.DATABASE_URL;
} else if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.DATABASE_TEST_URL;
}
export default connectionString;
