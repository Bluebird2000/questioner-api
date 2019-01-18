'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../dbconfig/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_dotenv2.default.config();
var AuthController = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} users object
   */
  create: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var findOneQuery, text, _req$body, firstname, lastname, othername, email, phoneNumber, username, password, hash, values, _ref2, rows, result;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              findOneQuery = 'SELECT * FROM users WHERE email=$1';
              text = 'INSERT INTO\n      users(firstname, lastname, othername, email, phoneNumber, username, password, created_at, updated_at)\n      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)\n      returning firstname, lastname, othername, email, phoneNumber, username';
              _req$body = req.body, firstname = _req$body.firstname, lastname = _req$body.lastname, othername = _req$body.othername, email = _req$body.email, phoneNumber = _req$body.phoneNumber, username = _req$body.username, password = _req$body.password;
              hash = _bcryptjs2.default.hashSync(password, 10);
              values = [firstname, lastname, othername, email.toLowerCase(), phoneNumber, username, hash, 'NOW()', 'NOW()'];
              _context.prev = 5;
              _context.next = 8;
              return _config2.default.query(findOneQuery, [email]);

            case 8:
              _ref2 = _context.sent;
              rows = _ref2.rows;

              if (!rows[0]) {
                _context.next = 12;
                break;
              }

              return _context.abrupt('return', res.status(409).json({
                message: 'sorry email already exist'
              }));

            case 12:
              _context.next = 14;
              return _config2.default.query(text, values);

            case 14:
              result = _context.sent;
              return _context.abrupt('return', res.status(201).json({
                status: 201,
                message: 'user resgistration was successful',
                data: [{
                  token: _jsonwebtoken2.default.sign(result.rows[0], process.env.JWT_KEY),
                  user: result.rows[0]
                }]
              }));

            case 18:
              _context.prev = 18;
              _context.t0 = _context['catch'](5);
              return _context.abrupt('return', res.status(400).send(_context.t0));

            case 21:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[5, 18]]);
    }));

    function create(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return create;
  }(),
  login: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var _req$body2, email, password, text, values, _ref4, rows, isValidPassword, token;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
              text = 'SELECT id, firstname, lastname, othername, email, phoneNumber, username, password FROM users WHERE email=$1';
              values = [email.toLowerCase()];
              _context2.prev = 3;
              _context2.next = 6;
              return _config2.default.query(text, values);

            case 6:
              _ref4 = _context2.sent;
              rows = _ref4.rows;

              if (rows[0]) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt('return', res.status(404).send({
                message: 'Sorry we coudnt find user with that email'
              }));

            case 10:
              isValidPassword = _bcryptjs2.default.compareSync(password, rows[0].password);

              if (isValidPassword) {
                _context2.next = 13;
                break;
              }

              return _context2.abrupt('return', res.status(422).json({
                status: 422,
                message: 'Credentials are not valid'
              }));

            case 13:
              token = _jsonwebtoken2.default.sign({ id: rows[0].id }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRY });

              delete rows[0].password;
              rows[0].token = token;
              res.status(200).json({
                status: 'success',
                data: rows[0]
              });
              _context2.next = 22;
              break;

            case 19:
              _context2.prev = 19;
              _context2.t0 = _context2['catch'](3);
              return _context2.abrupt('return', res.status(400));

            case 22:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[3, 19]]);
    }));

    function login(_x3, _x4) {
      return _ref3.apply(this, arguments);
    }

    return login;
  }(),
  update: function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var findOneQuery, updateOneQuery, _ref6, rows, _req$body3, firstname, lastname, othername, email, phoneNumber, username, password, values, response;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              findOneQuery = 'SELECT * FROM users WHERE id=$1';
              updateOneQuery = 'UPDATE users\n      SET firstname=$1,lastname=$2,othername=$3,email=$4,phoneNumber=$5,username=$6,password=$7,updated_at=$8\n      WHERE id=$9 returning firstname, lastname, othername, email, phoneNumber, username';
              _context3.prev = 2;
              _context3.next = 5;
              return _config2.default.query(findOneQuery, [req.params.id]);

            case 5:
              _ref6 = _context3.sent;
              rows = _ref6.rows;

              if (rows[0]) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt('return', res.status(404).send({
                message: 'user not found'
              }));

            case 9:
              _req$body3 = req.body, firstname = _req$body3.firstname, lastname = _req$body3.lastname, othername = _req$body3.othername, email = _req$body3.email, phoneNumber = _req$body3.phoneNumber, username = _req$body3.username, password = _req$body3.password;
              values = [firstname, lastname, othername, email.toLowerCase(), phoneNumber, username, password, 'NOW()', req.params.id];
              _context3.next = 13;
              return _config2.default.query(updateOneQuery, values);

            case 13:
              response = _context3.sent;
              return _context3.abrupt('return', res.status(200).send(response.rows[0]));

            case 17:
              _context3.prev = 17;
              _context3.t0 = _context3['catch'](2);
              return _context3.abrupt('return', res.status(400).send(_context3.t0));

            case 20:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[2, 17]]);
    }));

    function update(_x5, _x6) {
      return _ref5.apply(this, arguments);
    }

    return update;
  }()
};
exports.default = AuthController;