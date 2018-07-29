const pgp = require('pg-promise')();

require('dotenv').config();

const db = pgp('postgres://postgres:guesswho@localhost:5432/mydiaryapi');

module.exports = {
  db
};
