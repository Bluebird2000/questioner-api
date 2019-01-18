'use strict';

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

var truncateUserTableQuery = 'TRUNCATE TABLE users';

var tableQuery = '' + truncateUserTableQuery;
pool.query(tableQuery, function (error) {
  pool.end();
  if (error) {
    console.log(error.message);
    return;
  }
  console.log('Truncate tables before each test run');
});