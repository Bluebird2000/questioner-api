import express from 'express';

import UserController from '../controllers/users';

const router = express.Router();

router.post('/', UserController.users_sign_up);

router.get('/:id', UserController.users_get_user);


module.exports = router;
