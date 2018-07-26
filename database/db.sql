DROP DATABASE IF EXISTS entries;
CREATE DATABASE entries;

\c entries;

CREATE TABLE entries (
  ID SERIAL PRIMARY KEY,
  title TEXT,
  description  VARCHAR
  
);

INSERT INTO entries (title, description)
  VALUES ('Widget 1', 'nnnnnndddd'), ('Wid','ffff'), ('Wi', 'fffg');