import express from 'express';
import entries from '../routes/entries';
// import home from '../routes/home';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/entries', entries);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('welcome');
});

app.listen(port, '0.0.0.0');

module.exports = { app };
