'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userValidation = function userValidation(qUsers) {
  var userSchema = {
    firstname: _joi2.default.string().min(3).max(50).required(),
    lastname: _joi2.default.string().min(3).max(50).required(),
    othername: _joi2.default.string().min(3).max(50).required(),
    email: _joi2.default.string().email({ minDomainAtoms: 2 }).required(),
    phoneNumber: _joi2.default.string().trim().regex(/^[0-9]{7,11}$/).required(),
    username: _joi2.default.string().min(3).max(16).required(),
    password: _joi2.default.string().regex(/^[a-zA-Z0-9]{6,16}$/).required()
  };
  return _joi2.default.validate(qUsers, userSchema);
};
exports.default = userValidation;