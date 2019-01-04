'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var meetupquestionValidation = function meetupquestionValidation(createMeetupQ) {
  var meetupquestSchema = {
    meetupId: _joi2.default.required(),
    createdOn: _joi2.default.required(),
    createdBy: _joi2.default.required(),
    title: _joi2.default.string().required(),
    body: _joi2.default.string().required(),
    upvotes: _joi2.default.required(),
    downvotes: _joi2.default.required()
  };
  return _joi2.default.validate(createMeetupQ, meetupquestSchema);
};
module.exports = meetupquestionValidation;