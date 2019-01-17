/* eslint no-underscore-dangle: 0 */
import dotenv from 'dotenv';
import { Client } from 'pg';

import meetupValidation from '../models/meetup';


dotenv.config();

export default {
  getAllMeetups(req, res) {
    const client = new Client();
    client.connect()
      .then(() => {
        const action = 'SELECT * FROM meetups ORDER BY meetup_id ASC';
        return client.query(action);
      })
      .then((result) => {
        res.status(200)
          .json({
            status: 'success',
            meetups: result.rows,
          });
      });
  },

  getSingleMeetup(req, res, next) {
    // using obj destructring
    const { id } = req.params;
    const client = new Client();
    client.connect()
      .then(() => {
        const actions = 'SELECT * FROM meetups WHERE meetup_id=($1)';
        const values = [id];
        return client.query(actions, values);
      })
      .then((result) => {
        if (result.rowCount > 0) {
          res.status(200)
            .json({
              status: 'success',
              data: result.rows[0],
            });
        } else {
          res.status(404)
            .json({
              status: 404,
              message: 'Meetup with the requested id does not exist',
            });
        }
      })
      .catch((error) => {
        next(error);
      });
  },

  upcomingMeetups(req, res, next) {
    // using obj destructring
    const { id } = req.params;
    const client = new Client();
    client.connect()
      .then(() => {
        const actions = 'SELECT * FROM meetups WHERE happeningOn=($1)';
        const values = [id];
        return client.query(actions, values);
      })
      .then((result) => {
        if (result.rowCount > 0) {
          res.status(200)
            .json({
              status: 'success',
              data: result.rows[0],
            });
        } else {
          res.status(404)
            .json({
              status: 404,
              message: 'Meetup with the requested id does not exist',
            });
        }
      })
      .catch((error) => {
        next(error);
      });
  },

  updateSingleMeetup(req, res, next) {
    const { id } = req.params;
    const { location, topic, happeningOn } = req.body;
    const { error } = meetupValidation(req.body);
    if (error) {
      const e = error.details[0].message;
      return res.status(400)
        .send({
          status: 400,
          error: e,
        });
    }
    const client = new Client();
    client.connect()
      .then(() => {
        const text = 'UPDATE meetups SET location=($1), topic=($2), happeningOn=($3), updated_at=($4) WHERE meetup_id=($5) RETURNING meetup_id, location, topic, happeningOn';
        const values = [location, topic, happeningOn, 'NOW()', id];
        return client.query(text, values);
      })
      .then((result) => {
        if (result.rowCount > 0) {
          res.status(200)
            .json({
              status: 'success',
              data: result.rows[0],
            });
        } else {
          res.status(404)
            .json({
              status: 404,
              message: 'Meetup with the requested id does not exist',
            });
        }
      })
      .catch((err) => {
        next(err);
      });
  },

  deleteSingleMeetup(req, res, next) {
    const { id } = req.params;
    const client = new Client();
    client.connect()
      .then(() => {
        const action = 'DELETE FROM meetups WHERE meetup_id=($1)';
        const values = [id];
        return client.query(action, values);
      })
      .then((result) => {
        if (result.rowCount > 0) {
          res.status(204)
            .json({});
        } else {
          res.status(404)
            .json({
              status: 404,
              message: 'Meetup with the requested id does not exist',
            });
        }
      })
      .catch((e) => {
        next(e);
      });
  },
};
