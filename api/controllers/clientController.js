import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

class ClientController {
  constructor() {
    this.connectionString = process.env.DATABASE_URL;
    this.client = new Client({
      connectionString: this.connectionString,
    });
    this.client.connect()
      .then(() => console.log('connection to database was successfully established'))
      .catch(err => console.log(err.message));
  }
}

export default ClientController;
