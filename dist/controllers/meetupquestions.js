'use strict';

var _meetupquestion = require('../models/meetupquestion');

var _meetupquestion2 = _interopRequireDefault(_meetupquestion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var questions = [{
  id: 1,
  meetupId: 2,
  createdBy: 1,
  title: 'React summit',
  createdOn: new Date(),
  body: 'question body.',
  upvotes: 0,
  downvotes: 0
}, {
  id: 2,
  meetupId: 2,
  createdBy: 1,
  title: 'React summit',
  createdOn: new Date(),
  body: 'question body',
  upvotes: 0,
  downvotes: 0
}];
exports.create_meetup_question = function (req, res) {
  var _meetupquestionValida = (0, _meetupquestion2.default)(req.body),
      error = _meetupquestionValida.error;

  if (error) {
    var err = error.details[0].message;
    res.status(400).send({
      status: 400, error: err
    });
    return;
  }
  var data = {
    id: questions.length + 1,
    meetupId: req.body.meetupId,
    createdBy: req.body.createdBy,
    createdOn: req.body.createdOn,
    title: req.body.title,
    body: req.body.body,
    upvotes: req.body.upvotes,
    downvotes: req.body.downvotes
  };
  questions.push(data);
  res.status(200).send({
    status: 200,
    data: [data]
  });
};

exports.get_meetup_question = function (req, res) {
  var question = questions.find(function (q) {
    return q.id === parseInt(req.params.id);
  });
  if (!question) {
    res.status(404).send({
      status: 404,
      error: 'question with the requested id: ' + req.params.id + ' does not exist'
    });
    return;
  }
  res.status(200).send({
    status: 200,
    question: [question]
  });
};

exports.meetupquestions_upvote = function (req, res) {
  var question = questions.find(function (q) {
    return q.id === parseInt(req.params.id);
  });
  if (!question) {
    res.status(404).send({
      status: 404,
      error: 'question with the id ' + req.params.id + ' does not exist'
    });
  } else {
    question.upvotes = req.body.upvotes;
    res.status(200).send({
      status: 200,
      question: [question]
    });
  }
};

exports.meetupquestions_downvote = function (req, res) {
  var question = questions.find(function (q) {
    return q.id === parseInt(req.params.id);
  });
  if (!question) {
    res.status(404).send({
      status: 404,
      error: 'question with the id ' + req.params.id + ' does not exist'
    });
    return;
  }
  question.downvotes = req.body.downvotes;
  res.status(200).send({
    status: 200,
    question: [question]
  });
};