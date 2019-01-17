import express from 'express';

import AuthController from '../controllers/authController';

const router = express.Router();

router.post('/auth/signup', AuthController.userSignup);
router.post('/auth/login', AuthController.userLogin);

export default router;
