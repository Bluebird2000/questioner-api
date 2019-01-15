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
}

export default MeetupController;
