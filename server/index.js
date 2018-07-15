import express from 'express';

const app = express();
app.use(express.json());

const port = process.env.port || 3000;

app.get('/', (req, res) => {
  res.send('welcome');
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
