/* eslint no-underscore-dangle: 0 */
import dotenv from 'dotenv';
import ClientController from './clientController';

dotenv.config();

class MeetupController extends ClientController {
  getAllMeetups(req, res) {
    this._client.query('SELECT * FROM meetups ORDER BY meetup_id ASC')
      .then((result) => {
        res.status(200)
          .json({
            status: 'success',
            meetups: result.rows,
          });
      });
  }

  getSingleMeetup(req, res, next) {
    // using obj destructring
    const { id } = req.params;
    this._client.query('SELECT * FROM meetups WHERE meetup_id=($1)', [id])
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
      .catch((e) => {
        next(e);
      });
  }

  updateSingleMeetup(req, res, next) {
    const { location, topic, happeningOn } = req.body;
    const text = 'UPDATE users SET location=($1), topic=($2), happeningOn=($3), updated_at=($4) WHERE meetup_id=($5) RETURNING meetup_id, location, topic, happeningOn';
    const values = [location, topic, happeningOn, 'NOW()', req.userData.id];
    const query = {
      text,
      values,
    };
    this._client.query(query)
      .then((result) => {
        res.status(200)
          .json({
            status: 'success',
            data: result.rows[0],
          });
      })
      .catch((e) => {
        next(e);
      });
  }

  deleteSingleMeetup(req, res, next) {
    const { id } = req.params;
    this._client.query('DELETE FROM meetups WHERE meetup_id=($1)', [id])
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
  }
}

export default MeetupController;
