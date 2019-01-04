import express from 'express';

import MeetupController from '../controllers/meetups';

const router = express.Router();

router.post('/', MeetupController.create_meetup);

router.get('/', MeetupController.get_all_meetups);

router.get('/:id', MeetupController.get_single_meetup);

router.get('/upcomings/meetup', MeetupController.get_upcoming_meetups);

router.put('/:id', MeetupController.update_single_meetup);

router.delete('/:id', MeetupController.delete_single_meetup);

module.exports = router;
