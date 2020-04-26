import { connectDB } from '../config/database';
import config from './index';
import dbUtils from 'server/lib/dbUtils';

async function initializeAdmin() {
  const db = await connectDB();
  const users = db.collection('users');
  const adminUser = await users.findOne({ name: config.adminUser });
  if (!adminUser) {
    await dbUtils.addUser(config.adminUse, config.adminPwd, 'admin');
  }
}

initializeAdmin();
