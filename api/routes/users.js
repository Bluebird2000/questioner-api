import express from 'express';

import UserController from '../controllers/users';

const router = express.Router();

router.post('/users', UserController.userSignup);

router.get('/users/:id', UserController.getUsers);

router.put('/users/:id', UserController.updateUser);


module.exports = router;
