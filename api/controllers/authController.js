import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Client } from 'pg';
import userValidation from '../models/user';

dotenv.config();

export default {
  userSignup(req, res) {
    const { error } = userValidation(req.body);
    if (error) {
      const err = error.details[0].message;
      res.status(400)
        .json({
          status: 400, error: err,
        });
      return;
    }
    const {
      firstname, lastname, othername, email, phoneNumber, username, password, isAdmin,
    } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const client = new Client();
    client.connect()
      .then(() => {
        const action = 'INSERT INTO users (firstname, lastname, othername, email, phoneNumber, username, password, isAdmin, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING firstname, lastname, othername, email, phoneNumber, username';
        const values = [firstname, lastname, othername, email.toLowerCase(), phoneNumber, username, hash, isAdmin, 'NOW()', 'NOW()'];
        return client.query(action, values);
      })
      .then((result) => {
        res.status(201)
          .json({
            status: 201,
            message: 'success',
            data: [{
              token: jwt.sign(result.rows[0], process.env.JWT_KEY),
              user: result.rows[0],
            }],
          });
      })
      .catch(() => {
        res.status(409)
          .json({
            status: 409,
            message: 'sorry Email already exist',
          });
      });
  },

  userLogin(req, res, next) {
    const { email, password } = req.body;
    const client = new Client();
    client.connect()
      .then(() => {
        const sql = 'SELECT id, firstname, lastname, othername, email, phoneNumber, username, password FROM users WHERE email=($1)';
        const params = [email.toLowerCase()];
        return client.query(sql, params);
      })
      .then((result) => {
        if (result.rowCount > 0) {
          const data = result.rows[0];
          bcrypt.compare(password, data.password)
            .then((val) => {
              if (val) {
                const token = jwt.sign(
                  { id: data.id },
                  process.env.JWT_KEY,
                  { expiresIn: process.env.JWT_EXPIRY },
                );
                delete data.password;
                data.token = token;
                res.status(200)
                  .json({
                    status: 'success',
                    data,
                  });
              } else { // return error message if email and password  does not matches any record
                res.status(422)
                  .json({
                    status: 422,
                    message: 'Credentials do not match any record',
                  });
              }
            })
            .catch((err) => {
              next(err);
            });
        } else { // return error message if email does not exist
          res.status(422)
            .json({
              status: 422,
              message: 'sorry that email does not exist',
            });
        }
      })
      .catch((e) => {
        next(e);
      });
  },
};
