import query from "../models/query";

import validator from "../helpers/validation/validate";

function getAllEntries(req, res) {
  const userid = req.userData.userId;
  query
    .getAllEntries(userid)
    .then(data => {
      res.status(200).json({
        status: "success",
        data
      });
    })
    .catch(() => {
      res.json({
        status: "error",
        message: "No entry found"
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
        data
      });
    })
    .catch(() => {
      res.json({
        status: "error",
        message: "No entry found"
      });
    });
}

function addEntry(req, res) {
  const { error } = validator.validateEntry(req.body);
  if (error) res.status(400).json({ message: error.details[0].message });
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
    .catch(err => {
      res.json(err);
    });
}

function updateEntry(req, res) {
  const { error } = validator.validateEntry(req.body);
  if (error) res.status(400).send(error.details[0].message);
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
        status: "error",
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
      res.json({
        status: "error",
        message: "Entry not deleted"
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
