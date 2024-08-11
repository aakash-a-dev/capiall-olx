import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticate = (req: any, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
        req.user = decoded;
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
