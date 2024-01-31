import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { JWT_TOKEN } from "../configs/loadEnv";
interface ExtendedRequest extends Request {
    user?: any;
}
export async function signUp(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      // Validate user input
      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required' });
      }

      // Check if the email is already in use
    const existingUsername = await User.findOne({email}).exec();
    // console.log(existingUsername);
       if(existingUsername) {
        return res.status(409).json({ error: 'Email is already in use' });
      } 
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign(newUser._id,JWT_TOKEN as string,{
        expiresIn: 3 * 24 * 60 * 60
      })
      res.status(201).json({ message: 'User created successfully', user: newUser, token: token });
    } catch (error) {
      console.error('Error during sign-up:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
export const getUser = async (req:ExtendedRequest,res:Response) => {
    const id = req.user.id
    try{
        const user = await User.find({_id:id})
        res.status(200).json({user: user[0]})
    } catch(error:any){
        res.status(502).json({message: error.message})
    }
}
