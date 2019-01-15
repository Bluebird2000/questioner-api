/* eslint no-underscore-dangle: 0 */
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ClientController from './clientController';
import userValidation from '../models/user';

dotenv.config();

class AuthController extends ClientController {
  userSignup(req, res, next) {
    const { error } = userValidation(req.body);
    if (error) {
      const err = error.details[0].message;
      res.status(400)
        .json({
          status: 400, error: err,
        });
    }
    const {
      firstname, lastname, othername, email, phoneNumber, username, password, isAdmin,
    } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const action = 'INSERT INTO users (firstname, lastname, othername, email, phoneNumber, username, password, isAdmin, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
    const values = [firstname, lastname, othername, email.toLowerCase(), phoneNumber, username, hash, isAdmin, 'NOW()', 'NOW()'];
    const query = {
      text: action,
      values,
    };
    const token = jwt.sign(query, process.env.JWT_KEY);
    this._client.query(query)
      .then((result) => {
        res.status(201)
          .json({
            status: 201,
            message: 'success',
            data: [{
              token,
              user: result.rows[0],
            }],
          });
      })
      .catch((e) => {
        if (parseInt(e.code, 10) === 23505) {
          res.status(409)
            .json({
              status: 409,
              message: 'Sorry, an account with this email already exist',
            });
        }
        next(e);
      })
      .catch((err) => {
        next(err);
      });
  }

  login(req, res, next) {
    const { email, password } = req.body;
    this._client.query('SELECT id, firstname, lastname, othername, email, phoneNumber, username, password FROM users WHERE email=($1)', [email.toLowerCase()])
      .then((result) => {
        if (result.rowCount > 0) {
          const data = result.rows[0];
          bcrypt.compare(password, data.password)
            .then((val) => {
              if (val) {
                const token = jwt.sign(
                  {
                    id: data.id,
                    email: data.email,
                    firstname: data.firstname,
                    lastname: data.lastname,
                  },
                  process.env.JWT_KEY,
                  {
                    expiresIn: process.env.JWT_EXPIRY,
                  },
                );
                delete data.password;
                data.token = token;
                res.status(200)
                  .json({
                    status: 'success',
                    data,
                  });
              } else {
                res.status(401)
                  .json({
                    status: 401,
                    message: 'Credentials do not match any record',
                  });
              }
            })
            .catch((err) => {
              next(err);
            });
        } else {
          const error = new Error('Credentials do not match');
          error.status = 401;
          next(error);
        }
      })
      .catch((e) => {
        next(e);
      });
  }
}


export default AuthController;
