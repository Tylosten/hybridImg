import { MongoClient } from 'mongodb';
import config from '../config';

let db = null;

export async function connectDB() {
  if (db) {
    return db;
  }
  const client = await MongoClient.connect(config.dbString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = client.db();
  return db;
}
