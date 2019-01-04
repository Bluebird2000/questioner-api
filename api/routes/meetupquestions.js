import express from 'express';

import MeetupQuestionController from '../controllers/meetupquestions';

const router = express.Router();

router.post('/questions', MeetupQuestionController.create_meetup_question);

router.get('/questions/:id', MeetupQuestionController.get_meetup_question);

router.put('/questions/upvote/:id', MeetupQuestionController.meetupquestions_upvote);

router.put('/questions/downvote/:id', MeetupQuestionController.meetupquestions_downvote);


module.exports = router;
