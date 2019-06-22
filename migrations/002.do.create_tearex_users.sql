
CREATE TABLE tearex_users (
    id SERIAL PRIMARY KEY,
    user_name TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

ALTER TABLE teas
  ADD COLUMN
    user_id INTEGER REFERENCES tearex_users(id)
    ON DELETE SET NULL;