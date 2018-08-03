import { db } from "./connect";

const getAllEntries = userId =>
  db.any("SELECT * FROM entries WHERE userid = $1", [userId]);

const getOneEntry = (userid, id) =>
  db.one(
    `
SELECT *
FROM entries
WHERE userid=$1
AND id=$2
`,
    [userid, id]
  );
const addOneEntry = (title, description, userid) =>
  db.one(
    `
INSERT INTO
  entries (title, description,userid)
VALUES
  ($1, $2, $3)
RETURNING
  *
`,
    [title, description, userid]
  );
const updateOneEntry = (id, title, description, userid) =>
  db.one(
    `
UPDATE
  entries
SET
  (title, description)=($1, $2)
WHERE
  userid=$4
AND id=$3 
RETURNING
  *
`,
    [title, description, id, userid]
  );

const deleteEntry = (id, userid) =>
  db.one(
    `
      DELETE FROM
        entries
      WHERE
        userid=$1
      AND id=$2
      RETURNING
        *
    `,
    [userid, id]
  );
  
export default {
  getAllEntries,
  getOneEntry,
  addOneEntry,
  deleteEntry,
  updateOneEntry
};
