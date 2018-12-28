import express from 'express';

import UserController from '../controllers/users';

const router = express.Router();

router.post('/', UserController.users_sign_up);

module.exports = router;
