

CREATE TABLE entries (
  ID SERIAL PRIMARY KEY,
  title TEXT,
  description  VARCHAR,
  userid INTEGER
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
  
);

