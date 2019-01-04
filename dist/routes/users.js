'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users = require('../controllers/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', _users2.default.users_sign_up);

router.get('/:id', _users2.default.users_get_user);

router.put('/:id', _users2.default.users_update_user);

module.exports = router;