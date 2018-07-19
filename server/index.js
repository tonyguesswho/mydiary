import express from 'express';
import entries from '../routes/entries';
import home from '../routes/home';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/entries', entries);
app.use('/', home);

const port = process.env.port || 3000;
app.listen(port, () => {
  // console.log(`app listening on port ${port}`);
});

module.exports = { app };
