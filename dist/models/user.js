'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userValidation = function userValidation(qUsers) {
  var userSchema = {
    firstname: _joi2.default.string().min(3).max(50).required(),
    lastname: _joi2.default.string().min(3).max(50).required(),
    othername: _joi2.default.string().min(3).max(50).required(),
    email: _joi2.default.string().email({ minDomainAtoms: 2 }).required(),
    phoneNumber: _joi2.default.string().min(3).max(50).required(),
    username: _joi2.default.string().min(3).max(50).required(),
    password: _joi2.default.string().min(3).max(50).required()
    // isAdmin: Joi.string().required(),
  };
  return _joi2.default.validate(qUsers, userSchema);
};
module.exports = userValidation;