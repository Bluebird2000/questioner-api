import express from 'express';

import UserController from '../controllers/users';

const router = express.Router();
const user = new UserController();

router.post('/users', (req, res, next) => {
  user.userSignup(req, res, next);
});


export default router;
