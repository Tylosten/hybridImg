import defaultState from './defaultState';
import { connectDB } from '../config/database';

async function initializeDB() {
  const db = await connectDB();

  const userNb = await db.collection('users').countDocuments();
  if (userNb === 0) {
    for (const collectionName in defaultState) {
      const collection = db.collection(collectionName);
      await collection.insertMany(defaultState[collectionName]);
    }
  }
}

initializeDB();
