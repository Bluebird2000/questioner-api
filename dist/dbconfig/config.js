'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var connectionString = void 0;

if (process.env.NODE_ENV === 'development') {
  connectionString = process.env.DATABASE_URL;
  console.log(connectionString);
} else if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.DATABASE_TEST_URL;
  console.log(connectionString);
}

var pool = new _pg.Pool({
  connectionString: connectionString
});

exports.default = {
  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   */
  query: function query(text, params) {
    return new Promise(function (resolve, reject) {
      pool.query(text, params).then(function (res) {
        resolve(res);
      }).catch(function (err) {
        reject(err);
      });
    });
  }
};