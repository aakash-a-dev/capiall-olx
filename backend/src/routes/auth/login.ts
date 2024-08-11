import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getDb } from '../../db/connection';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET as string;

router.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email or Password field is empty" });
    }

    try {
        const db = await getDb();
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET);

        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
