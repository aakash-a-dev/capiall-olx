import { Router, Request, Response } from 'express';
import { getDb } from '../../db/connection';
import { authenticate } from '../../middleware/authenticate';

const router = Router();

router.post('/items', authenticate, async (req: Request, res: Response) => {
    const { name, price, sold } = req.body;
    const userId = (req as any).auth?.userId; 

    if (!name || !price) {
        return res.status(400).json({ message: 'Name and price are required' });
    }

    try {
        const db = await getDb();
        const itemsCollection = db.collection('items');

        const newItem = { name, price, sold: sold || false, userId };
        const result = await itemsCollection.insertOne(newItem);

        return res.status(201).json({ message: 'Item added successfully', itemId: result.insertedId });
    } catch (error) {
        console.error('Error adding item:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
