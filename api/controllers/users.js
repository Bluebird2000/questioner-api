import dotenv from 'dotenv';
import ClientController from './clientController';
import userValidation from '../models/user';

dotenv.config();

class UserController extends ClientController {
  userSignup(req, res) {
    const { error } = userValidation(req.body);
    if (error) {
      const err = error.details[0].message;
      res.status(400)
        .send({
          status: 400, error: err,
        });
    }
    const text = 'INSERT INTO users (firstname, lastname, othername, email, phone_number, username, password, registered, is_admin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    const values = [
      req.body.firstname,
      req.body.lastname,
      req.body.othername,
      req.body.email,
      req.body.phone_number,
      req.body.username,
      req.body.password,
      new Date(),
    ];
    const query = {
      text,
      values,
    };
    this.client.query(query)
      .then((result) => {
        res.status(201)
          .json({
            status: 'success',
            result,
          });
      })
      .catch((e) => {
        res.send(e);
      });
  }
}

export default UserController;
