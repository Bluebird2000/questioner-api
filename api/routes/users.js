import express from 'express';

import UserController from '../controllers/users';

const router = express.Router();
const user = new UserController();

router.post('/users', (req, res) => {
  user.userSignup(req, res);
});


export default router;
