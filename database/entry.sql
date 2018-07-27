DROP DATABASE IF EXISTS entries;
CREATE DATABASE entries;

\c entries;

CREATE TABLE entries (
  ID SERIAL PRIMARY KEY,
  title TEXT,
  description  VARCHAR,
  userId int
  
);

