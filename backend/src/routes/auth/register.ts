import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { MongoClient } from 'mongodb';
require('dotenv').config()

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET as string;
const saltRounds = 12;

// MongoDB connection URI
const uri: string = process.env.DATABASE_URL as string;

const client = new MongoClient(uri);
let dbConnection: any = null;

async function getDb() {
    if (!dbConnection) {
        await client.connect();
        dbConnection = client.db('mydatabase'); 
    }
    return dbConnection;
}

router.post("/register", async (req: Request, res: Response) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "Full name, Email, or Password field is empty" });
    }

    try {
        const db = await getDb();
        const usersCollection = db.collection('users');

        // Check if the user already exists
        const existingUser = await usersCollection.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already registered" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = {
            email,
            fullName,
            password: hashPassword
        };

        // Insert the new user into the database
        const result = await usersCollection.insertOne(newUser);

        // Create a JWT token
        const token = jwt.sign({ userId: result.insertedId, email: newUser.email }, JWT_SECRET);

        return res.status(201).json({ message: 'Registration successful', userId: result.insertedId, token });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
