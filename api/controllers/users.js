import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import ClientController from './clientController';
import userValidation from '../models/user';

dotenv.config();

class UserController extends ClientController {
  userSignup(req, res, next) {
    const { error } = userValidation(req.body);
    if (error) {
      const err = error.details[0].message;
      res.status(400)
        .send({
          status: 400, error: err,
        });
    }
    const text = 'INSERT INTO users (firstname, lastname, othername, email, phone_number, username, password, registered, is_admin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, firstname, lastname, othername, email, phone_number, username, password, registered';
    const values = [
      req.body.firstname,
      req.body.lastname,
      req.body.othername,
      req.body.email,
      req.body.phone_number,
      req.body.username,
      req.body.password,
      new Date(),
      req.body.is_admin,
    ];
    const query = {
      text,
      values,
    };
    this.client.query(query)
      .then((data) => {
        res.status(201)
          .json({
            status: 201,
            data: data.rows[0],
          });
      })
      .catch((e) => {
        next(e);
      });
  }
}

export default UserController;
