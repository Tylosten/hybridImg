import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017/hybridImgDb';
let db = null;

export async function connectDB() {
  if (db) {
    return db;
  }
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = client.db();
  return db;
}
