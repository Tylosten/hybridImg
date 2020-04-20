import express from 'express';
const router = express.Router();
import passport from 'passport';
import { v4 as uuid } from 'uuid';

import { genPassword } from 'server/lib/passwordUtils';
import { connectDB } from 'server/config/database';
import { serverRenderer } from 'renderers/server';
import { hybrids } from './hybrids';
import isAuth from './isAuth';

/**
 * -------------- Session ROUTES ----------------
 */
router.post('/login', (req, res, next) => {
  return passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(500).send('User or password incorrect');
    }
    return req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      return res
        .status(200)
        .json({ authenticated: true, user: { id: user.id, name: user.name } });
    });
  })(req, res, next);
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const { hash, salt } = genPassword(password);

  const db = await connectDB();
  const collection = db.collection('users');
  await collection.insertOne({
    id: uuid(),
    name: username,
    hash,
    salt,
  });

  res.status(200).send();
});

/**
 * -------------- Other ROUTES ----------------
 */
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

const getCollectionArray = async name => {
  const db = await connectDB();
  return db
    .collection(name)
    .find()
    .toArray();
};

const mainRendering = async (req, res) => {
  try {
    const hybrids = await getCollectionArray('hybrids');
    const tags = await getCollectionArray('tags');
    const users = await getCollectionArray('users');
    const grids = await getCollectionArray('grids');
    const session = req.isAuthenticated()
      ? {
        authenticated: true,
        user: users.find(u => u.id === req.session.passport.user),
      }
      : { authenticated: false };
    const vars = await serverRenderer(req.url, {
      hybrids,
      tags,
      users,
      grids,
      session,
    });
    res.render('index', vars);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

router.get('/login', mainRendering);

router.get(
  ['/', '/login', '/home', '/hybrids', '/grids', '/hybrid/*', '/grid/*'],
  isAuth,
  mainRendering
);

hybrids(router);

export default router;
