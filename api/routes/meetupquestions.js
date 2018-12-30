import express from 'express';

import MeetupQuestionController from '../controllers/meetupquestions';

const router = express.Router();

router.post('/', MeetupQuestionController.create_meetup_question);

module.exports = router;
