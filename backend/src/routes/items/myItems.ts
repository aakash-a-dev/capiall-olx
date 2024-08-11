import { Router, Request, Response } from 'express';
import { getDb } from '../../db/connection';
import { authenticate } from '../../middleware/authenticate';

const router = Router();

router.get('/my-items', authenticate, async (req: Request, res: Response) => {
    const userId = (req as any).auth?.userId;

    try {
        const db = await getDb();
        const itemsCollection = db.collection('items');

        const myItems = await itemsCollection.find({ userId }).toArray();
        return res.status(200).json(myItems);
    } catch (error) {
        console.error('Error fetching user items:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
