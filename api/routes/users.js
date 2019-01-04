import express from 'express';

import UserController from '../controllers/users';

const router = express.Router();

router.post('/users', UserController.users_sign_up);

router.get('/users/:id', UserController.users_get_user);

router.put('/users/:id', UserController.users_update_user);


module.exports = router;
