require('dotenv').config();
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});
const isConnected = client.connect();

export default {
    isConnected,
    db: client,
    ObjectId,
};
