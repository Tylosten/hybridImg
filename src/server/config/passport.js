import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { connectDB } from './database';
import { verifyPassword } from '../lib/passwordUtils';

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const db = await connectDB();
      const collection = db.collection('users');
      const user = await collection.findOne({ name: username });
      if (!user) {
        return done(null, false, `Couldn't find user ${username}`);
      }
      if (!verifyPassword(password, user.hash, user.salt)) {
        return done(null, false, `incorrect password for ${username}`);
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, { id: user.id, role: user.role });
});

passport.deserializeUser(async (passportUser, done) => {
  try {
    const db = await connectDB();
    const collection = db.collection('users');
    const user = await collection.findOne({ id: passportUser.id });
    if (!user) {
      return done(new Error('user not found'));
    }
    done(null, user);
  } catch (e) {
    done(e);
  }
});
