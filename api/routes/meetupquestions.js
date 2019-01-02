import express from 'express';

import MeetupQuestionController from '../controllers/meetupquestions';

const router = express.Router();

router.post('/', MeetupQuestionController.create_meetup_question);

router.get('/:id', MeetupQuestionController.get_meetup_question);

router.put('/upvote/:id', MeetupQuestionController.meetupquestions_upvote);

router.put('/downvote/:id', MeetupQuestionController.meetupquestions_downvote);


module.exports = router;
