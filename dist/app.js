'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

var _meetups = require('./routes/meetups');

var _meetups2 = _interopRequireDefault(_meetups);

var _meetupquestions = require('./routes/meetupquestions');

var _meetupquestions2 = _interopRequireDefault(_meetupquestions);

var _rsvp = require('./routes/rsvp');

var _rsvp2 = _interopRequireDefault(_rsvp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());

app.use('/api/v1/users', _users2.default);

app.use('/api/v1/meetups', _meetups2.default);

app.use('/api/v1/questions', _meetupquestions2.default);

app.use('/api/v1', _rsvp2.default);

module.exports = app;