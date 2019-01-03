import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './api/routes/users';
import meetupRoutes from './api/routes/meetups';
import meetupQuestionRoutes from './api/routes/meetupquestions';
import rsvpRoutes from './api/routes/rsvp';

const app = express();
app.use(bodyParser.json());

app.use('/api/v1/users', userRoutes);

app.use('/api/v1/meetups', meetupRoutes);

app.use('/api/v1/questions', meetupQuestionRoutes);

app.use('/api/v1', rsvpRoutes);

module.exports = app;
