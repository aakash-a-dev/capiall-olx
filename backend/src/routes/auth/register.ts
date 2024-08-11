import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getDb } from '../../db/connection';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET as string;
const saltRounds = 12;


router.post("/register", async (req: Request, res: Response) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "Full name, Email, or Password field is empty" });
    }

    try {
        const db = await getDb();
        const usersCollection = db.collection('users');

        const existingUser = await usersCollection.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already registered" });
        }

        const hashPassword = await bcrypt.hash(password, saltRounds);

        const newUser = {
            email,
            fullName,
            password: hashPassword
        };

        const result = await usersCollection.insertOne(newUser);

        const token = jwt.sign({ userId: result.insertedId, email: newUser.email }, JWT_SECRET);

        return res.status(201).json({ message: 'Registration successful', userId: result.insertedId, token });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
