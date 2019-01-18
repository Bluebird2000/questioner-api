'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _meetupsController = require('../controllers/meetupsController');

var _meetupsController2 = _interopRequireDefault(_meetupsController);

var _auth = require('../middleware/authorization/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/meetups', _auth2.default.isValid, _meetupsController2.default.create);

router.get('/meetups', _meetupsController2.default.getAll);

router.get('/meetups/upcomings', _meetupsController2.default.upcoming);

router.get('/meetups/:meetup_id', _meetupsController2.default.getOne);

router.put('/meetups/:id', _auth2.default.isValid, _meetupsController2.default.update);

router.delete('/meetups/:id', _auth2.default.isValid, _meetupsController2.default.delete);

exports.default = router;