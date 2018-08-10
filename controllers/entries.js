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
        status: "fail",
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
        status: "fail",
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
    .updateOneEntry(parseInt(req.params.id, 10), title, description, userid)
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "Entry updated succesfully",
        data
      });
    })
    .catch(() => {
      res.json({
        status: "fail",
        message: "Entry not updated"
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
