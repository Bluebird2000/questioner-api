/* eslint no-underscore-dangle: 0 */
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ClientController from './clientController';
import userValidation from '../models/user';

dotenv.config();

class UserController extends ClientController {
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
    const values = [firstname, lastname, othername, email, phoneNumber, username, hash, isAdmin, 'NOW()', 'NOW()'];
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
      .catch((err) => {
        if (err) {
          res.status(409)
            .json({
              status: 409,
              message: 'User with that email already exist',
            });
        }
        next();
      });
  }
}

export default UserController;
