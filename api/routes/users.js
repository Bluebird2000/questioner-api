import express from 'express';

import AuthController from '../controllers/authController';

const router = express.Router();
const user = new AuthController();

// Create a new user account
router.post('/auth/signup', (req, res, next) => {
  user.userSignup(req, res, next);
});

// Login a registered user
router.post('/auth/login', (req, res, next) => {
  user.login(req, res, next);
});

export default router;
