import { connectDB } from '../config/database';
import { v4 as uuid } from 'uuid';
import isAuth from './isAuth';

export const hybrids = app => {
  const addNewHybrid = async hybrid => {
    const db = await connectDB();
    const collection = db.collection('hybrids');
    await collection.insertOne(hybrid);
    return hybrid;
  };
  app.post('/hybrid/new', isAuth, async (req, res) => {
    const newHybrid = await addNewHybrid({
      id: uuid(),
      user: req.session.passport.user,
      ...req.body,
    });
    res.status(200).json(newHybrid);
  });

  const checkHybridOwner = async (hybridId, user) => {
    const db = await connectDB();
    const collection = db.collection('hybrids');
    const hybrid = collection.findOne({ id: hybridId });
    return hybrid.user === user.id;
  };

  const deleteHybrid = async hybridId => {
    const db = await connectDB();
    const collection = db.collection('hybrids');
    await collection.deleteOne({ id: hybridId });
  };
  app.delete('/hybrid/:id', isAuth, async (req, res) => {
    const isOwner = await checkHybridOwner(
      req.params.id,
      req.session.passport.user
    );
    if (isOwner) {
      await deleteHybrid(req.params.id);
      res.status(200).send();
    } else {
      res.status(401).send();
    }
  });

  const updateHybrid = async hybrid => {
    const { id, name, tags, url, user, grid } = hybrid;
    const db = await connectDB();
    const collection = db.collection('hybrids');

    if (name) {
      await collection.updateOne({ id }, { $set: { name } });
    }
    if (user) {
      await collection.updateOne({ id }, { $set: { user } });
    }
    if (tags) {
      await collection.updateOne({ id }, { $set: { tags } });
    }
    if (url) {
      await collection.updateOne({ id }, { $set: { url } });
    }
    if (grid) {
      await collection.updateOne({ id }, { $set: { grid } });
    }
  };
  app.post('/hybrid/update', isAuth, async (req, res) => {
    const isOwner = await checkHybridOwner(
      req.body.id,
      req.session.passport.user
    );
    if (isOwner) {
      await updateHybrid(req.body);
      res.status(200).send();
    } else {
      res.status(401).send();
    }
  });
};
