/* eslint no-underscore-dangle: 0 */
import dotenv from 'dotenv';
import db from '../dbconfig/config';

dotenv.config();

const MeetupController = {
  /**
   * Create A Meetup, Get Single Meetup, Get All Meetup, Update Single Meetup, Delete single meetup
   * @param {object} req
   * @param {object} res
   * @returns {object} meetups object
   */
  async create(req, res) {
    const text = `INSERT INTO
      meetups(id, location, topic, happeningOn, created_date, updated_at)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
    const {
      location, topic, happeningOn,
    } = req.body;
    const values = [location, topic, happeningOn, 'NOW()'];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201)
        .send({
          status: 201,
          meetup: rows[0],
        });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM meetups';
    try {
      const { rows } = await db.query(findAllQuery);
      return res.status(200)
        .send({
          status: 200,
          meetups: rows,
        });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async upcoming(req, res) {
    const findAllQuery = 'SELECT * FROM meetups WHERE created_at = $1 >= NOW() returning *';
    try {
      const { rows } = await db.query(findAllQuery);
      console.log(rows);
      return res.status(200)
        .send({
          status: 200,
          meetups: rows,
        });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async getOne(req, res) {
    const text = 'SELECT * FROM meetups WHERE meetup_id = $1';
    try {
      const { rows } = await db.query(text, [req.params.meetup_id]);
      if (!rows[0]) {
        return res.status(404)
          .send({
            status: 404,
            message: 'meetup record not found',
          });
      }
      return res.status(200)
        .send({
          status: 200,
          meetup: rows[0],
        });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async update(req, res) {
    const findOneQuery = 'SELECT * FROM meetups WHERE meetup_id=$1';
    const updateOneQuery = `UPDATE meetups
      SET location=$1,topic=$2,happeningOn=$3,updated_at=$4
      WHERE meetup_id=$5 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.meetup_id]);
      if (!rows[0]) {
        return res.status(404).send({
          message: 'Meetup record not found',
        });
      }
      const {
        location, topic, happeningOn,
      } = req.body;
      const values = [location, topic, happeningOn, 'NOW()'];
      const response = await db.query(updateOneQuery, values);
      return res.status(200)
        .send({
          status: 200,
          data: response.rows[0],
        });
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async delete(req, res) {
    const deleteQuery = 'DELETE * FROM meetups WHERE meetup_id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.meetup_id]);
      if (!rows[0]) {
        return res.status(404).send({
          message: 'Meetup record not found',
        });
      }
      return res.status(204).send({
        message: rows[0],
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

};

export default MeetupController;
