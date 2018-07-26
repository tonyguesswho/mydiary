import joi from 'joi';

import query from '../database/query';

function validateEntry(body) {
  const schema = {
    title: joi
      .string()
      .min(1)
      .required(),
    description: joi
      .string()
      .min(1)
      .required()
  };
  return joi.validate(body, schema);
}

function getAllEntries(req, res) {
  query
    .getAllEntries()
    .then(data => {
      res.status(200).json({
        status: 'success',
        data
      });
    })
    .catch(err => {
      res.json(err);
    });
}

function getOneEntry(req, res) {
  const { id } = req.params;
  query
    .getOneEntry(id)
    .then(data => {
      res.status(200).json({
        status: 'success',
        message: 'Entry updated succesfully',
        data
      });
    })
    .catch(err => {
      res.json(err);
    });
}

function addEntry(req, res) {
  const { error } = validateEntry(req.body);
  if (error) res.status(400).send(error.details[0].message);
  query
    .addOneEntry(req.body.title, req.body.description)
    .then(data => {
      res.status(201).json({
        status: 'success',
        message: 'Entry Created succesfully',
        data
      });
    })
    .catch(err => {
      res.json(err);
    });
}

function updateEntry(req, res) {
  const { error } = validateEntry(req.body);
  if (error) res.status(400).send(error.details[0].message);
  const { title, description } = req.body;

  query
    .updateOneEntry(parseInt(req.params.id, 10), title, description)
    .then(data => {
      res.status(200).json({
        status: 'success',
        message: 'Entry updated succesfully',
        data
      });
    })
    .catch(err => {
      res.json(err);
    });
}

function deleteOneEntry(req, res) {
  const { id } = req.params;
  query
    .deleteEntry(id)
    .then(data => {
      res.status(200).json({
        status: 'success',
        message: 'Entry updated succesfully',
        data
      });
    })
    .catch(err => {
      res.json(err);
    });
}

export default {
  getAllEntries,
  getOneEntry,
  addEntry,
  updateEntry,
  deleteOneEntry
};
