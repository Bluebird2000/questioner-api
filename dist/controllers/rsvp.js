'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var rsvps = [{
  id: 1,
  meetup: 1,
  user: 1,
  topic: 'React summit',
  response: 'no'
}];
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
  happeningOn: '2019-01-03',
  tags: ['laravel', 'Django', 'python']
}];
exports.default = {
  rsvpResponse: function rsvpResponse(req, res) {
    var data = meetups.find(function (meetup) {
      return meetup.id === parseInt(req.params.id);
    });
    if (!data) {
      res.status(404).send({
        status: 404,
        error: 'Meetup with the given ID: ' + req.params.id + ' does not exist'
      });
      return;
    }
    var rsvp = {
      id: rsvps.length + 1,
      meetup: req.body.meetup,
      user: req.body.user,
      topic: req.body.topic,
      response: req.body.response
    };
    rsvps.push(rsvp);
    res.status(201).send({
      status: 201,
      rsvp: rsvp
    });
  }
};