'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _questions = require('../controllers/questions');

var _questions2 = _interopRequireDefault(_questions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/questions', _questions2.default.createQuestion);

router.get('/questions/:id', _questions2.default.meetupQuestion);

router.put('/questions/:id/upvote', _questions2.default.upvoteQuestion);

router.put('/questions/:id/downvote', _questions2.default.downvoteQuestion);

exports.default = router;