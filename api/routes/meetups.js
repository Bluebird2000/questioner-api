import express from 'express';

import MeetupController from '../controllers/meetups';

const router = express.Router();

router.post('/', MeetupController.create_meetup);

router.get('/', MeetupController.get_all_meetups);

module.exports = router;
