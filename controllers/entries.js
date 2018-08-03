import query from "../models/query";

function getAllEntries(req, res) {
  const userid = req.userData.userId;
  const { username } = req.userData;
  query
    .getAllEntries(userid)
    .then(data => {
      res.status(200).json({
        status: "success",
        username,
        data
      });
    })
    .catch(() => {
      res.status(500).json({
        status: "error",
        message: "Internal server error"
      });
    });
}

function getOneEntry(req, res) {
  const { id } = req.params;
  const userid = req.userData.userId;
  query
    .getOneEntry(userid, id)
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "successfully Got one entry",
        data
      });
    })
    .catch(() => {
      res.json({
        status: "error",
        message: "Entry Not found"
      });
    });
}

function addEntry(req, res) {
  const id = req.userData.userId;
  query
    .addOneEntry(req.body.title, req.body.description, id)
    .then(data => {
      res.status(201).json({
        status: "success",
        message: "Entry Created succesfully",
        data
      });
    })
    .catch(() => {
      res.json({
        status: "fail",
        message: "Entry not created"
      });
    });
}

function updateEntry(req, res) {
  const { title, description } = req.body;
  const userid = req.userData.userId;
  query
    .getOneEntry(userid, parseInt(req.params.id, 10))
    .then(data => {
      // reference - https://stackoverflow.com/questions/11072467/javascript-relative-time-24-hours-ago-etc-as-time
      const created =
        new Date().getTime() - new Date(data.created_at).getTime();
      if (created > 86400000) {
        res.status(403).json({
          status:"fail",
          message: "Entry can no longer be updated"
        });
      } else {
        query
          .updateOneEntry(
            parseInt(req.params.id, 10),
            title,
            description,
            userid
          )
          .then(data2 => {
            res.status(200).json({
              status: "success",
              message: "Entry updated succesfully",
              data: data2
            });
          });
      }
    })
    .catch(e => {
      res.status(500).json({
        status: "fail",
        message: "Entry not updated, Internal server error"
      });
    });
}

function deleteOneEntry(req, res) {
  const { id } = req.params;
  const userid = req.userData.userId;
  query
    .deleteEntry(id, userid)
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "Entry deleted succesfully",
        data
      });
    })
    .catch(() => {
      res.status(500).json({
        status: "fail",
        message: "Internal server error"
      });
    });
}

export default {
  getAllEntries,
  getOneEntry,
  addEntry,
  updateEntry,
  deleteOneEntry
};
