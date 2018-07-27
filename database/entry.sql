DROP DATABASE IF EXISTS entries;
CREATE DATABASE entries;

\c entries;

CREATE TABLE entries (
  ID SERIAL PRIMARY KEY,
  title TEXT,
  description  VARCHAR,
<<<<<<< HEAD
  userid INTEGER
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
=======
  userId int
>>>>>>> 0c1099610de85d43f362acd1ff1f48e9782aea9c
  
);

