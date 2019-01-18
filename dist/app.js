'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

var _meetups = require('./routes/meetups');

var _meetups2 = _interopRequireDefault(_meetups);

var _questions = require('./routes/questions');

var _questions2 = _interopRequireDefault(_questions);

var _rsvp = require('./routes/rsvp');

var _rsvp2 = _interopRequireDefault(_rsvp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());

app.use('/api/v1', _users2.default);

app.use('/api/v1', _meetups2.default);

app.use('/api/v1', _questions2.default);

app.use('/api/v1', _rsvp2.default);

exports.default = app;