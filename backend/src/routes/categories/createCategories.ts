import { Router, Request, Response } from 'express';
import { getDb } from '../../db/connection';
import { authenticate } from '../../middleware/authenticate';

const router = Router();

router.post('/categories', authenticate, async (req: Request, res: Response) => {
    const { name } = req.body;
    const userId = (req as any).auth?.userId; 

    if (!name) {
        return res.status(400).json({ message: 'Name and price are required' });
    }

    try {
        const db = await getDb();
        const categoriesCollection = db.collection('category');

        const newCategory = { name, userId };
        const result = await categoriesCollection.insertOne(newCategory);

        return res.status(201).json({ message: 'Category added successfully', categoryId: result.insertedId });
    } catch (error) {
        console.error('Error adding item:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});