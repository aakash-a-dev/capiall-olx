import { Request, Response, Router } from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import {authenticate} from '../../middleware/authenticate';  // Ensure you have the authenticate middleware

const router = Router();
const client = new MongoClient(process.env.DATABASE_URL as string);
let dbConnection: any = null;

async function getDb() {
    if (!dbConnection) {
        await client.connect();
        dbConnection = client.db('mydatabase');
    }
    return dbConnection;
}

router.put('/items/:id', authenticate, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, price, sold } = req.body;

    if (!name || price === undefined || sold === undefined) {
        return res.status(400).json({ message: 'Name, Price, and Sold status are required' });
    }

    try {
        const db = await getDb();
        const itemsCollection = db.collection('items');

        const result = await itemsCollection.updateOne(
            { _id: new ObjectId(id), userId: (req as any).user.userId },  // Ensure the item belongs to the user
            { $set: { name, price, sold } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Item not found or not authorized to update' });
        }

        return res.status(200).json({ message: 'Item updated successfully' });
    } catch (error) {
        console.error('Error updating item:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
