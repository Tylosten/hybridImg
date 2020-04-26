import express from 'express';
const router = express.Router();
import passport from 'passport';
import { v4 as uuid } from 'uuid';

import { genPassword, verifyPassword } from 'server/lib/passwordUtils';
import { connectDB } from 'server/config/database';
import { serverRenderer } from 'renderers/server';
import { tags } from './tags';
import { templates } from './templates';
import { grids } from './grids';
import { hybrids } from './hybrids';
import isAuth from './isAuth';

/**
 * -------------- Session ROUTES ----------------
 */
router.post('/login', (req, res, next) => {
  return passport.authenticate('local', (err, user, info) => {
    if (err || !user) {
      console.info('LOGIN failed', info);
    }
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(500).send('Nom ou mot de passe incorrect');
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

const checkNameUnicity = async (req, res, next) => {
  try {
    const db = await connectDB();
    const collection = db.collection('users');
    const user = await collection.findOne({ name: req.body.username });
    if (!user) {
      next();
    } else {
      res.status(500).send('Cet utilisateur existe déjà');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

router.post('/register', checkNameUnicity, async (req, res) => {
  try {
    const { username, password } = req.body;
    const { hash, salt } = genPassword(password);

    const db = await connectDB();
    const collection = db.collection('users');
    const user = {
      id: uuid(),
      name: username,
      hash,
      salt,
    };
    await collection.insertOne(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send('Erreur lors de l\'ajout d\'un utilisateur');
  }
});

router.post('/user/delete', isAuth, async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection('users');
    await collection.deleteOne({ id: req.body.id });
    res.status(200).send();
  } catch (err) {
    console.info(err);
    res.status(500).send('Erreur lors de la suppression de l\'utilisateur');
  }
});

router.post('/user/updatepwd', isAuth, async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection('users');
    const user = await collection.findOne({ id: req.session.passport.user });
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    if (!verifyPassword(req.body.oldPwd, user.hash, user.salt)) {
      res.status(403).send('Invalid password');
      return;
    }

    await collection.updateOne(
      { id: req.session.passport.user },
      { $set: { ...genPassword(req.body.newPwd) } }
    );
    res.status(200).send();
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * -------------- Other ROUTES ----------------
 */
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
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
    const templates = await getCollectionArray('templates');
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
      templates,
    });
    res.render('index', vars);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

router.get(['/login', '/', '/register'], mainRendering);

router.get('/*', isAuth, mainRendering);

tags(router);
templates(router);
grids(router);
hybrids(router);

export default router;
