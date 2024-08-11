import { Router, Request, Response } from 'express';
import { getDb } from '../../db/connection';
import { authenticate } from '../../middleware/authenticate';

const router = Router();

router.get('/my-purchases', authenticate, async (req: Request, res: Response) => {
    const userId = (req as any).auth?.userId;

    try {
        const db = await getDb();
        const purchasesCollection = db.collection('purchases');

        const myPurchases = await purchasesCollection.find({ userId }).toArray();
        return res.status(200).json(myPurchases);
    } catch (error) {
        console.error('Error fetching user purchases:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
