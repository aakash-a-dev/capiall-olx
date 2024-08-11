import { Request, Response, Router } from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import authenticate from '../middleware/authenticate';  // Ensure you have the authenticate middleware

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

router.delete('/items/:id', authenticate, async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const db = await getDb();
        const itemsCollection = db.collection('items');

        const result = await itemsCollection.deleteOne(
            { _id: new ObjectId(id), userId: (req as any).user.userId }  // Ensure the item belongs to the user
        );

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Item not found or not authorized to delete' });
        }

        return res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
