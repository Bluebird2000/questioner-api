import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './api/routes/users';
import meetupRoutes from './api/routes/meetups';

const app = express();
app.use(bodyParser.json());

app.use('/api/v1/users', userRoutes);

app.use('/api/v1/meetups', meetupRoutes);


module.exports = app;
