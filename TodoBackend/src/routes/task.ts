import express from 'express';
import { addTask, getTask, removeTask } from '../controllers/taskController';
import { verifyJWT } from '../middleware/authToken';

const router = express.Router();

router.post('/addTask', verifyJWT, addTask);
router.get("/getTask", verifyJWT, getTask);
router.delete('/removeTask', verifyJWT, removeTask);

export default router;
