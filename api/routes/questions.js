import express from 'express';

import MeetupQuestionController from '../controllers/questions';

const router = express.Router();

router.post('/questions', MeetupQuestionController.createQuestion);

router.get('/questions/:id', MeetupQuestionController.meetupQuestion);

router.put('/questions/:id/upvote', MeetupQuestionController.upvoteQuestion);

router.put('/questions/:id/downvote', MeetupQuestionController.downvoteQuestion);


module.exports = router;
