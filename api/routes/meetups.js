import express from 'express';

import MeetupController from '../controllers/meetups';

const router = express.Router();

router.post('/meetups', MeetupController.create_meetup);

router.get('/meetups', MeetupController.get_all_meetups);

router.get('/meetups/:id', MeetupController.get_single_meetup);

router.get('/meetups/upcomings/meetup', MeetupController.get_upcoming_meetups);

router.put('/meetups/:id', MeetupController.update_single_meetup);

router.delete('/meetups/:id', MeetupController.delete_single_meetup);

module.exports = router;
