BEGIN;

TRUNCATE
  tearex_users,
  teas
  RESTART IDENTITY CASCADE;

INSERT INTO tearex_users (user_name, password)
VALUES
  ('demo', 'demopass'),
  ('test', 'testpass');

INSERT INTO teas (user_id, teaName, brand, type, packaging, notes)
VALUES
  ('1', 'darjeeling', 'top teas', 'black', 'looseleaf', 'dont oversteep'),
  ('2', 'chamomile', 'soothing', 'herbal', 'bag', 'nice'),
  ('1', 'matcha', 'imperial', 'green', 'looseleaf', 'expensive');

COMMIT;