DROP DATABASE IF EXISTS entries;
CREATE DATABASE entries;

\c entries;

CREATE TABLE entries (
  ID SERIAL PRIMARY KEY,
  title TEXT,
  description  VARCHAR,
  usrid int FOREIGN KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
  
);

