import express from 'express';
import joi from 'joi';

const app = express();
app.use(express.json());

const port = process.env.port || 3000;

// data structure for diary entries
const entries = [
  {
    id: 1,
    title: 'sample title',
    description: 'sample description'
  },
  {
    id: 2,
    title: 'sample title',
    description: 'sample description'
  }
];
// validating entry
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

app.get('/api/v1/entries', (req, res) => {
  res.status(200).json(entries);
});

app.get('/api/v1/entries/:id', (req, res) => {
  const entryId = req.params.id;
  const entry = entries.find(val => val.id === parseInt(entryId, 10));
  if (!entry) return res.status(404).send('The entry with this id does not exist');
  return res.status(200).json(entry);
});

app.post('/api/v1/entries', (req, res) => {
  const { error } = validateEntry(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let newId;
  if (entries.length > 0) {
    newId = entries[entries.length - 1].id + 1;
  } else {
    newId = 1;
  }
  const newEntry = {
    id: newId,
    title: req.body.title,
    description: req.body.description
  };
  entries.push(newEntry);
  const entry = entries.find(val => val.id === newId);
  return res.status(201).json(entry);
});

app.put('/api/v1/entries/:id', (req, res) => {
  const entryId = req.params.id;

  const entry = entries.find(val => val.id === parseInt(entryId, 10));
  if (!entry) return res.status(404).send('No diary entry with the give id');

  const { error } = validateEntry(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const updatedEntry = {
    title: req.body.title,
    description: req.body.description
  };
  entry.title = updatedEntry.title;
  entry.description = updatedEntry.description;

  return res.status(200).json(entry);
});

app.delete('/api/v1/entries/:id', (req, res) => {
  const entryId = req.params.id;

  const entry = entries.find(val => val.id === parseInt(entryId, 10));
  if (!entry) return res.status(404).send('No diary entry with the given id');

  const entryIndex = entries.indexOf(entry);
  entries.splice(entryIndex, 1);

  return res.status(200).json(entry);
});

app.delete('/api/v1/entries/', (req, res) => {
  entries.splice(0, entries.length);

  return res.status(200).json(entries);
});

app.listen(port, () => {
  // console.log(`app listening on port ${port}`);
});
