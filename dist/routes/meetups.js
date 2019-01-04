'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _meetups = require('../controllers/meetups');

var _meetups2 = _interopRequireDefault(_meetups);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', _meetups2.default.create_meetup);

router.get('/', _meetups2.default.get_all_meetups);

router.get('/:id', _meetups2.default.get_single_meetup);

router.get('/upcomings/meetup', _meetups2.default.get_upcoming_meetups);

router.put('/:id', _meetups2.default.update_single_meetup);

router.delete('/:id', _meetups2.default.delete_single_meetup);

module.exports = router;