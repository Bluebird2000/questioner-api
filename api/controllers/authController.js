import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../dbconfig/config';


dotenv.config();
const AuthController = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} users object
   */
  async create(req, res) {
    const findOneQuery = 'SELECT * FROM users WHERE email=$1';
    const text = `INSERT INTO
      users(firstname, lastname, othername, email, phoneNumber, username, password, created_at, updated_at)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      returning firstname, lastname, othername, email, phoneNumber, username`;
    const {
      firstname, lastname, othername, email, phoneNumber, username, password,
    } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const values = [
      firstname, lastname, othername, email.toLowerCase(), phoneNumber, username, hash, 'NOW()', 'NOW()',
    ];
    try {
      const { rows } = await db.query(findOneQuery, [email]);
      if (rows[0]) {
        return res.status(409)
          .json({
            message: 'sorry email already exist',
          });
      }
      const result = await db.query(text, values);
      return res.status(201).json({
        status: 201,
        message: 'user resgistration was successful',
        data: [{
          token: jwt.sign(result.rows[0], process.env.JWT_KEY),
          user: result.rows[0],
        }],
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    const text = 'SELECT id, firstname, lastname, othername, email, phoneNumber, username, password FROM users WHERE email=$1';
    const values = [email.toLowerCase()];
    try {
      const { rows } = await db.query(text, values);
      if (!rows[0]) {
        return res.status(404)
          .send({
            message: 'Sorry we coudnt find user with that email',
          });
      }
      const isValidPassword = bcrypt.compareSync(password, rows[0].password);
      if (!isValidPassword) {
        return res.status(422)
          .json({
            status: 422,
            message: 'Credentials are not valid',
          });
      }
      const token = jwt.sign(
        { id: rows[0].id }, process.env.JWT_KEY,
        { expiresIn: process.env.JWT_EXPIRY },
      );
      delete rows[0].password;
      rows[0].token = token;
      res.status(200)
        .json({
          status: 'success',
          data: rows[0],
        });
    } catch (error) {
      return res.status(400);
    }
  },

  async update(req, res) {
    const findOneQuery = 'SELECT * FROM users WHERE id=$1';
    const updateOneQuery = `UPDATE users
      SET firstname=$1,lastname=$2,othername=$3,email=$4,phoneNumber=$5,username=$6,password=$7,updated_at=$8
      WHERE id=$9 returning firstname, lastname, othername, email, phoneNumber, username`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404)
          .send({
            message: 'user not found',
          });
      }
      const {
        firstname, lastname, othername, email, phoneNumber, username, password,
      } = req.body;
      const values = [
        firstname, lastname, othername, email.toLowerCase(), phoneNumber, username, password, 'NOW()',
        req.params.id,
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

};
export default AuthController;
