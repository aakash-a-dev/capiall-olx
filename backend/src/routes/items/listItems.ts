import { Router, Request, Response } from 'express';
import { getDb } from '../../db/connection';

const router = Router();

router.get('/items', async (req: Request, res: Response) => {
    try {
        const db = await getDb();
        const itemsCollection = db.collection('items');

        // Fetch only unsold items
        const unsoldItems = await itemsCollection.find({ sold: false }).toArray();
        return res.status(200).json(unsoldItems);
    } catch (error) {
        console.error('Error fetching items:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
