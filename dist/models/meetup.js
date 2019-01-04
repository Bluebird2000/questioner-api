'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var meetupValidation = function meetupValidation(createMeetup) {
  var meetupSchema = {
    createdOn: _joi2.default.required(),
    location: _joi2.default.string().min(2).max(250).required(),
    topic: _joi2.default.string().min(3).max(100).required(),
    happeningOn: _joi2.default.required(),
    tags: _joi2.default.required()
  };
  return _joi2.default.validate(createMeetup, meetupSchema);
};
module.exports = meetupValidation;