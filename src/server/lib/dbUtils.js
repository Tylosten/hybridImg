import { v4 as uuid } from 'uuid';
import { genPassword } from 'server/lib/passwordUtils';
import { connectDB } from '../config/database';

async function addUser(username, password, role) {
  const db = await connectDB();
  const users = db.collection('users');
  const user = await users.findOne({ name: username });
  if (user) {
    throw 'Cet utilisateur existe déjà';
  }

  const { hash, salt } = genPassword(password);
  const newuser = {
    id: uuid(),
    name: username,
    role: role,
    hash,
    salt,
  };
  await users.insertOne(newuser);
  return newuser;
}

const getCollectionArray = async name => {
  const db = await connectDB();
  return db
    .collection(name)
    .find()
    .toArray();
};

export default { addUser, getCollectionArray };
