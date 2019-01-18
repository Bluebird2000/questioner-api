'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authController = require('../controllers/authController');

var _authController2 = _interopRequireDefault(_authController);

var _auth = require('../middleware/authorization/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/auth/signup', _authController2.default.create);
router.post('/auth/login', _authController2.default.login);
router.put('/users/profile/:id', _auth2.default.isValid, _authController2.default.update);
exports.default = router;