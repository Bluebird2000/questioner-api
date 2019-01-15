import express from 'express';

import MeetupController from '../controllers/meetupsController';

const router = express.Router();
const meetup = new MeetupController();

router.get('/meetups', (req, res, next) => {
  meetup.getAllMeetups(req, res, next);
});

export default router;
