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
  res.json(entries);
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
