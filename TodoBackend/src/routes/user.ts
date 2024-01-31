import express from 'express';
import { getUser } from '../controllers/userController';
import { verifyJWT } from '../middleware/authToken';

const router = express.Router();

router.get('/getuser',verifyJWT,getUser);
export default router;