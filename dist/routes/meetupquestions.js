'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _meetupquestions = require('../controllers/meetupquestions');

var _meetupquestions2 = _interopRequireDefault(_meetupquestions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', _meetupquestions2.default.create_meetup_question);

router.get('/:id', _meetupquestions2.default.get_meetup_question);

router.put('/upvote/:id', _meetupquestions2.default.meetupquestions_upvote);

router.put('/downvote/:id', _meetupquestions2.default.meetupquestions_downvote);

module.exports = router;