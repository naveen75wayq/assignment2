import jwt from "jsonwebtoken";
import {Request, Response , NextFunction} from 'express'
import { JWT_TOKEN } from "../configs/loadEnv";
interface ExtendedRequest extends Request {
    user?: any;
    token?: string;
}
export const verifyJWT = (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({message:'Unauthorized'});
    }
    const token = authorization.split(' ')[1]+"";
    try {
        const decoded =  jwt.verify(token, JWT_TOKEN as string);
        req.user = decoded;
        req.token = token;
        next();
    } catch (error:any) {
        return res.status(500).json({message:error.message});
    }
};