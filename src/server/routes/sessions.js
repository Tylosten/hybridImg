import passport from 'passport';
import { genPassword, verifyPassword } from 'server/lib/passwordUtils';
import dbUtils from 'server/lib/dbUtils';
import { connectDB } from 'server/config/database';
import isAuth from 'server/routes/isAuth';

export const sessions = app => {
  app.post('/login', (req, res, next) => {
    return passport.authenticate('local', (err, user, info) => {
      if (err || !user) {
        console.info('LOGIN failed', info);
        return next(err || 'Nom ou mot de passe incorrect');
      }
      return req.logIn(user, err => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          authenticated: true,
          user: { id: user.id, name: user.name, role: user.role },
        });
      });
    })(req, res, next);
  });

  app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = await dbUtils.addUser(username, password, 'user');
    return res.status(200).json(user);
  });

  app.post('/user/delete', isAuth('admin'), async (req, res) => {
    const db = await connectDB();
    const collection = db.collection('users');
    await collection.deleteOne({ id: req.body.id });
    return res.status(200).send();
  });

  app.post('/user/updatepwd', isAuth(), async (req, res) => {
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

  app.get('/logout', (req, res) => {
    req.logout();
    return res.redirect('/login');
  });
};
