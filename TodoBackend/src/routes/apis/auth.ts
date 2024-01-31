import express from 'express';
import { signUp } from '../../controllers/userController';
import { signIn } from '../../controllers/authController';
import { verifyJWT } from '../../middleware/authToken';
const router = express.Router();

router.post('/signup',signUp);
router.post('/signin',signIn);
export default router;