import express from 'express';
import entries from '../routes/entries';
import home from '../routes/home';
import user from '../routes/user';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/entries', entries);
app.use('/', home);
app.use('/user', user);

const port = process.env.PORT || 3000;

app.listen(port);
