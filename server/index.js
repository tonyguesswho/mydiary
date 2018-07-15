import express from 'express';

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

app.get('/api/v1/entries', (req, res) => {
  res.status(200).json(entries);
});

app.get('/api/v1/entries/:id', (req, res) => {
  const entryId = req.params.id;
  const entry = entries.find(val => val.id === parseInt(entryId, 10));
  if (!entry) return res.status(404).send('The entry with this id does not exist');
  return res.json(entry);
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
