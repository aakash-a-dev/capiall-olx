import { Router, Request, Response } from 'express';
import { getDb } from '../../db/connection';
import { authenticate } from '../../middleware/authenticate';

const router = Router();

// Define a list of allowed categories
const allowedCategories = ['Electronics', 'Furniture', 'Clothing', 'Vehicles', 'Books', 'Other'];

router.post('/items', authenticate, async (req: Request, res: Response) => {
    const { name, price, sold, category } = req.body;
    const userId = (req as any).auth?.userId;

    if (!name || !price) {
        return res.status(400).json({ message: 'Name and price are required' });
    }

    if (!category || !allowedCategories.includes(category)) {
        return res.status(400).json({ message: `Category is required and must be one of the following: ${allowedCategories.join(', ')}` });
    }

    try {
        const db = await getDb();
        const itemsCollection = db.collection('items');

        const newItem = { name, price, sold: sold || false, category, userId };
        const result = await itemsCollection.insertOne(newItem);

        return res.status(201).json({ message: 'Item added successfully', itemId: result.insertedId });
    } catch (error) {
        console.error('Error adding item:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
