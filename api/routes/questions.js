import express from 'express';

import MeetupQuestionController from '../controllers/questions';

const router = express.Router();

router.post('/questions', MeetupQuestionController.createQuestion);

router.get('/questions/:id', MeetupQuestionController.meetupQuestion);

router.put('/questions/upvote/:id', MeetupQuestionController.upvoteQuestion);

router.put('/questions/downvote/:id', MeetupQuestionController.downvoteQuestion);


module.exports = router;
