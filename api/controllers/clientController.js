/* eslint no-underscore-dangle: 0 */
import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

class ClientController {
  constructor() {
    if (process.env.NODE_ENV === 'development') {
   	this._connectionString = process.env.DATABASE_URL;
    } else if (process.env.NODE_ENV === 'test') {
   	this._connectionString = process.env.DATABASE_TEST_URL;
    }
    this._client = new Client({
      connectionString: this._connectionString,
    });
    this._client.connect()
      .then(() => console.log('Connection to database was successfully established'))
      .catch(err => console.log(err.message));
  }
}

export default ClientController;
