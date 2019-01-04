'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _rsvp = require('../controllers/rsvp');

var _rsvp2 = _interopRequireDefault(_rsvp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/meetups/:id/rsvps', _rsvp2.default.create_rsvp_response);

module.exports = router;