import express from 'express';

import MeetupController from '../controllers/meetups';

const router = express.Router();

router.post('/meetups', MeetupController.createMeetup);

router.get('/meetups', MeetupController.getMeetups);

router.get('/meetups/:id', MeetupController.singleMeetup);

router.get('/meetups/upcomings/meetup', MeetupController.upcomingMeetups);

router.put('/meetups/:id', MeetupController.updateMeetup);

router.delete('/meetups/:id', MeetupController.deleteMeetup);

export default router;
