import express from 'express';

import MeetupController from '../controllers/meetupsController';
import authorization from '../middleware/authorization/auth';

const router = express.Router();
const meetup = new MeetupController();

router.get('/meetups', (req, res, next) => {
  meetup.getAllMeetups(req, res, next);
});

// router.get('/meetups/upcomings', (req, res, next) => {
//   meetup.getUpcomingMeetup(req, res, next);
// });

router.get('/meetups/:id', (req, res, next) => {
  meetup.getSingleMeetup(req, res, next);
});

router.put('/meetups/:id', [authorization.isValid], (req, res, next) => {
  meetup.updateSingleMeetup(req, res, next);
});

router.delete('/meetups/:id', [authorization.isValid], (req, res, next) => {
  meetup.deleteSingleMeetup(req, res, next);
});

export default router;
