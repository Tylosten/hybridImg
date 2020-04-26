import express from 'express';
import errorWrapper from './errorWrapper';
import passport from 'passport';

import { genPassword, verifyPassword } from 'server/lib/passwordUtils';
import dbUtils from 'server/lib/dbUtils';
import { connectDB } from 'server/config/database';
import { serverRenderer } from 'renderers/server';
import { tags } from './tags';
import { templates } from './templates';
import { grids } from './grids';
import { hybrids } from './hybrids';
import isAuth from './isAuth';

const router = express.Router();
const wrapper = errorWrapper(router);

/**
 * -------------- Session ROUTES ----------------
 */
wrapper.post('/login', (req, res, next) => {
  return passport.authenticate('local', (err, user, info) => {
    if (err || !user) {
      console.info('LOGIN failed', info);
      return next(err || 'Nom ou mot de passe incorrect');
    }
    return req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      return res
        .status(200)
        .json({
          authenticated: true,
          user: { id: user.id, name: user.name, role: user.role },
        });
    });
  })(req, res, next);
});

wrapper.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = await dbUtils.addUser(username, password, 'user');
  return res.status(200).json(user);
});

wrapper.post('/user/delete', isAuth('admin'), async (req, res) => {
  const db = await connectDB();
  const collection = db.collection('users');
  await collection.deleteOne({ id: req.body.id });
  return res.status(200).send();
});

wrapper.post('/user/updatepwd', isAuth(), async (req, res) => {
  const db = await connectDB();
  const collection = db.collection('users');
  const user = await collection.findOne({ id: req.session.passport.user.id });
  if (!user) {
    return res.status(404).send('User not found');
  }
  if (!verifyPassword(req.body.oldPwd, user.hash, user.salt)) {
    return res.status(403).send('Invalid password');
  }
  await collection.updateOne(
    { id: req.session.passport.user.id },
    { $set: { ...genPassword(req.body.newPwd) } }
  );
  return res.status(200).send();
});

/**
 * -------------- Other ROUTES ----------------
 */
wrapper.get('/logout', (req, res) => {
  req.logout();
  return res.redirect('/login');
});

const mainRendering = async (req, res) => {
  const hybrids = await dbUtils.getCollectionArray('hybrids');
  const tags = await dbUtils.getCollectionArray('tags');
  const users = await dbUtils.getCollectionArray('users');
  const grids = await dbUtils.getCollectionArray('grids');
  const templates = await dbUtils.getCollectionArray('templates');
  const session = req.isAuthenticated()
    ? {
      authenticated: true,
      user: users.find(u => u.id === req.session.passport.user.id),
    }
    : { authenticated: false };
  const vars = await serverRenderer(req.url, {
    hybrids,
    tags,
    users,
    grids,
    session,
    templates,
  });
  res.render('index', vars);
};

wrapper.get(['/admin', 'admin/*'], isAuth('admin'), mainRendering);
wrapper.get(
  [
    '/home',
    '/home/*',
    '/templates',
    '/templates/*',
    '/grids',
    '/grids/*',
    '/grid/*',
    '/hybrids',
    '/hybrids/*',
    '/hybrid/*',
  ],
  isAuth(),
  mainRendering
);
wrapper.get(['/login', '/', '/register'], mainRendering);

tags(wrapper);
templates(wrapper);
grids(wrapper);
hybrids(wrapper);

export default router;
