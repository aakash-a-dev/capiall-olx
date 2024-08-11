import { MongoClient } from 'mongodb';
require('dotenv').config();

const uri: string = process.env.DATABASE_URL as string;
const client = new MongoClient(uri);

let dbConnection: any = null;

export async function getDb() {
    if (!dbConnection) {
        await client.connect();
        dbConnection = client.db('mydatabase');
    }
    return dbConnection;
}
