import express from 'express';
import dotenv from 'dotenv'
import path from 'path';
import { PORT } from './configs/loadEnv';
import { connectDB } from './configs/dbconn';
import taskRouter from '../src/routes/task'
import authRouter from '../src/routes/apis/auth'
import userRouter from '../src/routes/user'
import cors from 'cors'
dotenv.config({path: path.resolve('src/.env')})
// app setup
const app = express();

// server port
const port = PORT;

//connect to DB
connectDB();

// app middleware
app.use(express.json());

//enable cors for all routes
app.use(cors());

//route
app.use('/',taskRouter,userRouter,authRouter)



app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
})
