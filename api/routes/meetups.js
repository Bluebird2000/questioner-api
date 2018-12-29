import express from 'express';

import MeetupController from '../controllers/meetups';

const router = express.Router();

router.post('/', MeetupController.create_meetup);

module.exports = router;
