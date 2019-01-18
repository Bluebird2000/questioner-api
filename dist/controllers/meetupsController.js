'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _config = require('../dbconfig/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* eslint no-underscore-dangle: 0 */


_dotenv2.default.config();

var MeetupController = {
  /**
   * Create A Meetup, Get Single Meetup, Get All Meetup, Update Single Meetup, Delete single meetup
   * @param {object} req
   * @param {object} res
   * @returns {object} meetups object
   */
  create: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var text, _req$body, location, topic, happeningOn, values, _ref2, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              text = 'INSERT INTO\n      meetups(id, location, topic, happeningOn, created_date, updated_at)\n      VALUES($1, $2, $3, $4, $5, $6)\n      returning *';
              _req$body = req.body, location = _req$body.location, topic = _req$body.topic, happeningOn = _req$body.happeningOn;
              values = [location, topic, happeningOn, 'NOW()'];
              _context.prev = 3;
              _context.next = 6;
              return _config2.default.query(text, values);

            case 6:
              _ref2 = _context.sent;
              rows = _ref2.rows;
              return _context.abrupt('return', res.status(201).send({
                status: 201,
                meetup: rows[0]
              }));

            case 11:
              _context.prev = 11;
              _context.t0 = _context['catch'](3);
              return _context.abrupt('return', res.status(400).send(_context.t0));

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 11]]);
    }));

    function create(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return create;
  }(),
  getAll: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var findAllQuery, _ref4, rows;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              findAllQuery = 'SELECT * FROM meetups';
              _context2.prev = 1;
              _context2.next = 4;
              return _config2.default.query(findAllQuery);

            case 4:
              _ref4 = _context2.sent;
              rows = _ref4.rows;
              return _context2.abrupt('return', res.status(200).send({
                status: 200,
                meetups: rows
              }));

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2['catch'](1);
              return _context2.abrupt('return', res.status(400).send(_context2.t0));

            case 12:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[1, 9]]);
    }));

    function getAll(_x3, _x4) {
      return _ref3.apply(this, arguments);
    }

    return getAll;
  }(),
  upcoming: function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var findAllQuery, _ref6, rows;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              findAllQuery = 'SELECT * FROM meetups WHERE created_at = $1 >= NOW() returning *';
              _context3.prev = 1;
              _context3.next = 4;
              return _config2.default.query(findAllQuery);

            case 4:
              _ref6 = _context3.sent;
              rows = _ref6.rows;

              console.log(rows);
              return _context3.abrupt('return', res.status(200).send({
                status: 200,
                meetups: rows
              }));

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3['catch'](1);
              return _context3.abrupt('return', res.status(400).send(_context3.t0));

            case 13:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[1, 10]]);
    }));

    function upcoming(_x5, _x6) {
      return _ref5.apply(this, arguments);
    }

    return upcoming;
  }(),
  getOne: function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var text, _ref8, rows;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              text = 'SELECT * FROM meetups WHERE meetup_id = $1';
              _context4.prev = 1;
              _context4.next = 4;
              return _config2.default.query(text, [req.params.meetup_id]);

            case 4:
              _ref8 = _context4.sent;
              rows = _ref8.rows;

              if (rows[0]) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt('return', res.status(404).send({
                status: 404,
                message: 'meetup record not found'
              }));

            case 8:
              return _context4.abrupt('return', res.status(200).send({
                status: 200,
                meetup: rows[0]
              }));

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4['catch'](1);
              return _context4.abrupt('return', res.status(400).send(_context4.t0));

            case 14:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this, [[1, 11]]);
    }));

    function getOne(_x7, _x8) {
      return _ref7.apply(this, arguments);
    }

    return getOne;
  }(),
  update: function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
      var findOneQuery, updateOneQuery, _ref10, rows, _req$body2, location, topic, happeningOn, values, response;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              findOneQuery = 'SELECT * FROM meetups WHERE meetup_id=$1';
              updateOneQuery = 'UPDATE meetups\n      SET location=$1,topic=$2,happeningOn=$3,updated_at=$4\n      WHERE meetup_id=$5 returning *';
              _context5.prev = 2;
              _context5.next = 5;
              return _config2.default.query(findOneQuery, [req.params.meetup_id]);

            case 5:
              _ref10 = _context5.sent;
              rows = _ref10.rows;

              if (rows[0]) {
                _context5.next = 9;
                break;
              }

              return _context5.abrupt('return', res.status(404).send({
                message: 'Meetup record not found'
              }));

            case 9:
              _req$body2 = req.body, location = _req$body2.location, topic = _req$body2.topic, happeningOn = _req$body2.happeningOn;
              values = [location, topic, happeningOn, 'NOW()'];
              _context5.next = 13;
              return _config2.default.query(updateOneQuery, values);

            case 13:
              response = _context5.sent;
              return _context5.abrupt('return', res.status(200).send({
                status: 200,
                data: response.rows[0]
              }));

            case 17:
              _context5.prev = 17;
              _context5.t0 = _context5['catch'](2);
              return _context5.abrupt('return', res.status(400).send(_context5.t0));

            case 20:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this, [[2, 17]]);
    }));

    function update(_x9, _x10) {
      return _ref9.apply(this, arguments);
    }

    return update;
  }(),
  delete: function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
      var deleteQuery, _ref12, rows;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              deleteQuery = 'DELETE * FROM meetups WHERE meetup_id=$1 returning *';
              _context6.prev = 1;
              _context6.next = 4;
              return _config2.default.query(deleteQuery, [req.params.meetup_id]);

            case 4:
              _ref12 = _context6.sent;
              rows = _ref12.rows;

              if (rows[0]) {
                _context6.next = 8;
                break;
              }

              return _context6.abrupt('return', res.status(404).send({
                message: 'Meetup record not found'
              }));

            case 8:
              return _context6.abrupt('return', res.status(204).send({
                message: rows[0]
              }));

            case 11:
              _context6.prev = 11;
              _context6.t0 = _context6['catch'](1);
              return _context6.abrupt('return', res.status(400).send(_context6.t0));

            case 14:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this, [[1, 11]]);
    }));

    function _delete(_x11, _x12) {
      return _ref11.apply(this, arguments);
    }

    return _delete;
  }()
};

exports.default = MeetupController;