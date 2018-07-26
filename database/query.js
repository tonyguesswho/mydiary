import { db } from './connect';

const getAllEntries = () => db.any('SELECT * FROM entries');

const getOneEntry = id =>
  db.one(
    `
SELECT *
FROM entries
WHERE id=$1
LIMIT 1
`,
    [id]
  );
const addOneEntry = (title, description) =>
  db.one(
    `
INSERT INTO
  entries (title, description)
VALUES
  ($1, $2)
RETURNING
  *
`,
    [title, description]
  );
const updateOneEntry = (id, title, description) =>
  db.one(
    `
      UPDATE
        entries
      SET
        (title, description)=($2, $3,)
      WHERE
        id=$1
      RETURNING
        *
    `,
    [id, title, description]
  );
const deleteEntry = id =>
  db.one(
    `
      DELETE FROM
        entries
      WHERE
        id=$1
      RETURNING
        *
    `,
    [id]
  );
export default {
  getAllEntries,
  getOneEntry,
  addOneEntry,
  deleteEntry,
  updateOneEntry
};
