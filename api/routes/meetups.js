import express from 'express';

import MeetupController from '../controllers/meetups';

const router = express.Router();

router.post('/meetups', MeetupController.createMeetup);

router.get('/meetups', MeetupController.getMeetups);

router.get('/meetups/upcomings', MeetupController.upcomingMeetups);

router.get('/meetups/:id', MeetupController.singleMeetup);

router.put('/meetups/:id', MeetupController.updateMeetup);

router.delete('/meetups/:id', MeetupController.deleteMeetup);

export default router;
