import {Request, Response, NextFunction} from 'express';
import admin from '../config/firebase.config';

export interface AuthRequest extends Request {
    user?: {
        uid: string;
        email: string;
    };
}

export const authMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization?.split('Bearer ')[1];

        if (!token) {
            return res.status(401).json({error: 'No token provided'});
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = {
            uid: decodedToken.uid,
            email: decodedToken.email || '',
        };

        next();
    } catch (error) {
        console.error('Auth Middleware Error:', error);
        res.status(401).json({error: 'Invalid token'});
    }
};