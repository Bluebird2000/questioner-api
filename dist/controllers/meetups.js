'use strict';

var _meetup = require('../models/meetup');

var _meetup2 = _interopRequireDefault(_meetup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var meetups = [{
  id: 1,
  createdOn: new Date().getFullYear(),
  location: 'Ajah',
  topic: 'React summit',
  happeningOn: '2019-01-03',
  tags: ['nodejs', 'react', 'mongo', 'express']
}, {
  id: 2,
  createdOn: new Date().getFullYear(),
  location: 'Ojodu berger',
  topic: 'Developer fest',
  happeningOn: '2019-04-03',
  tags: ['laravel', 'Django', 'python']
}];
exports.create_meetup = function (req, res) {
  var _meetupValidation = (0, _meetup2.default)(req.body),
      error = _meetupValidation.error;

  if (error) {
    var err = error.details[0].message;
    return res.status(400).send({ status: 400, error: err });
  }
  var data = {
    id: meetups.length + 1,
    createdOn: req.body.createdOn,
    location: req.body.location,
    topic: req.body.topic,
    happeningOn: req.body.happeningOn,
    tags: req.body.tags
  };
  if (Number.isNaN(new Date(req.body.happeningOn).getTime())) {
    return res.status(422).send({ status: 422, error: 'please provide a valid meetup date' });
  }
  if (new Date(req.body.happeningOn).getTime() < new Date().getTime()) {
    return res.status(422).send({ status: 422, error: 'please provide a future meetup date not a past date' });
  }
  meetups.push(data);
  return res.status(200).send({ status: 200, data: [data] });
};

exports.get_all_meetups = function (req, res) {
  res.status(200).send({
    status: 200,
    meetups: meetups
  });
};

exports.get_single_meetup = function (req, res) {
  var meetup = meetups.find(function (m) {
    return m.id === parseInt(req.params.id);
  });
  if (!meetup) {
    res.status(404).send({
      status: 404,
      error: 'Meetup with the given ID: ' + req.params.id + ' does not exist'
    });
    return;
  }
  res.status(200).send({
    status: 200,
    meetup: [meetup]
  });
};

exports.get_upcoming_meetups = function (req, res) {
  var now = new Date().getTime();
  var upComingMeetups = meetups.filter(function (meetup) {
    return new Date(meetup.happeningOn).getTime() >= now;
  });
  if (!upComingMeetups.length) {
    res.status(404).send({
      status: 404,
      error: 'There are no upcoming meetups'
    });
  } else {
    res.status(200).send({
      status: 200,
      data: upComingMeetups
    });
  }
};

exports.update_single_meetup = function (req, res) {
  var meetup = meetups.find(function (m) {
    return m.id === parseInt(req.params.id);
  });

  var _meetupValidation2 = (0, _meetup2.default)(req.body),
      error = _meetupValidation2.error;

  if (!meetup) return res.status(404).send({ status: 404, error: 'Meetup with id: ' + req.params.id + ' does not exist' });
  if (error) {
    var e = error.details[0].message;
    return res.status(400).send({ status: 400, error: e });
  }

  if (Number.isNaN(new Date(req.body.happeningOn).getTime())) {
    return res.status(422).send({ status: 422, error: 'please provide a valid meetup date' });
  }

  if (new Date(req.body.happeningOn).getTime() < new Date().getTime()) {
    return res.status(422).send({ status: 422, error: 'please provide a future meetup date not a past date' });
  }
  meetup.createdOn = req.body.createdOn;
  meetup.location = req.body.location;
  meetup.topic = req.body.topic;
  meetup.happeningOn = req.body.happeningOn;
  meetup.tags = req.body.tags;
  return res.status(200).send({ status: 200, meetup: [meetup] });
};

exports.delete_single_meetup = function (req, res) {
  var meetup = meetups.find(function (m) {
    return m.id === parseInt(req.params.id);
  });
  if (!meetup) {
    return res.status(404).send({ status: 404, error: 'Meetup with the given ID: ' + req.params.id + ' does not exist' });
  }
  return res.status(200).send({
    status: 200,
    meetup: [meetup]
  });
};