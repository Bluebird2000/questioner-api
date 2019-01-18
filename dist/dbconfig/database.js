'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _pg = require('pg');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var connectionString = void 0;

var dbconfig = {
  development: process.env.DATABASE_URL,
  test: process.env.DATABASE_TEST_URL
};

if (process.env.NODE_ENV === 'development') {
  connectionString = dbconfig.development;
  console.log(connectionString);
} else if (process.env.NODE_ENV === 'test') {
  connectionString = dbconfig.test;
  console.log(connectionString, 'oo');
}
var client = new _pg.Client({
  connectionString: connectionString
});
client.connect(function (err) {
  if (err) {
    console.log(err.message);
    client.end();
  } else {
    console.log('connection to server established');
  }
});

var userTableQuery = 'DROP TABLE IF EXISTS users cascade;\n        CREATE TABLE users(\n          id SERIAL PRIMARY KEY,\n          firstname VARCHAR(255) NOT NULL, \n          lastname VARCHAR(255), \n          othername VARCHAR(255), \n          email VARCHAR(225) UNIQUE NOT NULL, \n          phoneNumber VARCHAR(255), \n          username VARCHAR(255), \n          password TEXT NOT NULL, \n          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), \n          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())';

var createTestUser = 'INSERT INTO users(\n          firstname, \n          lastname, \n          othername, \n          email, \n          phoneNumber, \n          username, \n          password, \n          created_at, \n          updated_at\n          )\n          VALUES(\n          \'test\', \n          \'tester\', \n          \'testest\', \n          \'tester@questioner.com\', \n          \'08097012219\', \n          \'Bluebird2000\', \n          \'$2a$10$HlG7pZklq8YqxvCmj6JNxuM9Gwuk/5cRzt4uARUNIJVqUNWlxBtQS\', \n          NOW(), \n          NOW()\n          )';

var meetupTableQuery = 'DROP TABLE IF EXISTS meetups cascade;\n        CREATE TABLE meetups(\n          meetup_id SERIAL PRIMARY KEY, \n          location VARCHAR(255) NOT NULL, \n          topic VARCHAR(255) UNIQUE NOT NULL, \n          happeningOn VARCHAR(255), \n          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), \n          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n          )';

var createTestMeetup = 'INSERT INTO meetups(\n          location, \n          topic, \n          happeningOn, \n          created_at, \n          updated_at\n          )\n          VALUES(\n          \'Ojodu Berger\', \n          \'React summit\', \n          \'2019-01-03\', NOW(), \n          NOW()\n          )';

var tableQuery = userTableQuery + ' ; ' + createTestUser + ' ; ' + meetupTableQuery + ' ; ' + createTestMeetup;
client.query(tableQuery, function (error) {
  client.end();
  if (error) {
    console.log(error.message);
    return;
  }
  console.log('Database migration successful');
});

exports.default = dbconfig;