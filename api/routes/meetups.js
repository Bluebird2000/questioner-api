import express from 'express';

import MeetupController from '../controllers/meetupsController';
import authorization from '../middleware/authorization/auth';

const router = express.Router();

// router.post('/meetups', authorization.isValid, MeetupController.createMeetup);

router.get('/meetups', MeetupController.getAllMeetups);

router.get('/meetups/upcomings', MeetupController.upcomingMeetups);

router.get('/meetups/:id', MeetupController.getSingleMeetup);

// router.put('/meetups/:id', authorization.isValid, MeetupController.updateSingleMeetup);

router.delete('/meetups/:id', authorization.isValid, MeetupController.deleteSingleMeetup);

export default router;
