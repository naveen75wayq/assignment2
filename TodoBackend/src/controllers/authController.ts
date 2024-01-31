import {Request, Response} from 'express'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from '../models/user';
import {  JWT_TOKEN } from '../configs/loadEnv';
// export const signIn = async (req:Request,res:Response) => {
//     const {email, password} = req.body;
//     try{
//         if(!email || !password){
//             return res.status(400).json({message: "Please enter all fields"})
//         }
//         const user = await User.findOne({email})

//         if(!user){
//             return res.status(400).json({message: "User does not exist"})
//         }

//         const isMatch = await bcrypt.compare(password, user.password)
//         if(!isMatch){
//             return res.status(400).json({message: "Invalid credentials"})
//         }
//         const token = jwt.sign(user._id, JWT_TOKEN as string, {
//             expiresIn: 3 * 24 * 60 * 60
//         })
//         res.status(200).json({user,token})
//     } catch (error:any) {
//         res.status(500).json({message: error.message})
//     }
// }

export async function signIn(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        // Validate user input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            // Successfully signed in

            // token 
            const token = jwt.sign(
                { id: user._id },
                JWT_TOKEN as string,
                { expiresIn: 3 * 24 * 60 * 60 }
            );
            
            // Send authorization roles and access token to user
           res.json({user,token})
        } else {
            // Authentication failed
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
