import express from 'express';

import MeetupController from '../controllers/meetupsController';
import authorization from '../middleware/authorization/auth';

const router = express.Router();

router.post('/meetups', authorization.isValid, MeetupController.create);

router.get('/meetups', MeetupController.getAll);

router.get('/meetups/upcomings', MeetupController.upcoming);

router.get('/meetups/:meetup_id', MeetupController.getOne);

router.put('/meetups/:id', authorization.isValid, MeetupController.update);

router.delete('/meetups/:id', authorization.isValid, MeetupController.delete);

export default router;
