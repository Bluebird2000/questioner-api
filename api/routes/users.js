import express from 'express';

import AuthController from '../controllers/authController';
import authorization from '../middleware/authorization/auth';


const router = express.Router();

router.post('/auth/signup', AuthController.create);
router.post('/auth/login', AuthController.login);
router.put('/users/profile/:id', authorization.isValid, AuthController.update);
export default router;
