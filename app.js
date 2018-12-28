import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './api/routes/users';

const app = express();
app.use(bodyParser.json());

app.use('/api/v1/users', userRoutes);

module.exports = app;
