import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/users';
import meetupRoutes from './routes/meetups';
import meetupQuestionRoutes from './routes/meetupquestions';
import rsvpRoutes from './routes/rsvp';

const app = express();
app.use(bodyParser.json());

app.use('/api/v1', userRoutes);

app.use('/api/v1', meetupRoutes);

app.use('/api/v1', meetupQuestionRoutes);

app.use('/api/v1', rsvpRoutes);

module.exports = app;
