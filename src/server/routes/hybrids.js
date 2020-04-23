import { connectDB } from '../config/database';
import { v4 as uuid } from 'uuid';
import isAuth from './isAuth';
import { uploadImage, resizeImage } from './imgUpload';
import fs from 'fs';
import util from 'util';
const unlink = util.promisify(fs.unlink);

export const hybrids = app => {
  const addNewHybrid = async hybrid => {
    const db = await connectDB();
    const collection = db.collection('hybrids');
    await collection.insertOne(hybrid);
    return hybrid;
  };
  app.post(
    '/hybrid/new',
    isAuth,
    uploadImage,
    resizeImage,
    async (req, res) => {
      if (!req.file) {
        throw 'File wasn\'t uploaded';
      }

      const newHybrid = await addNewHybrid({
        id: uuid(),
        user: req.session.passport.user,
        url: req.filepath,
        name: req.body.name,
        grid: req.body.grid,
        tags: req.body.tags.split(','),
      });
      res.status(200).json(newHybrid);
    }
  );

  const checkHybridOwner = async (req, res, next) => {
    const hybridId = req.body.id;
    const userId = req.session.passport.user;
    const db = await connectDB();
    const collection = db.collection('hybrids');
    const hybrid = await collection.findOne({ id: hybridId });
    if (hybrid.user === userId) {
      next();
    } else {
      return res.status(401).send('Unauthorized');
    }
  };

  const deleteHybrid = async hybridId => {
    const db = await connectDB();
    const collection = db.collection('hybrids');
    const hybrid = await collection.findOne({ id: hybridId });
    await unlink('public' + hybrid.url);
    await collection.deleteOne({ id: hybridId });
  };
  app.post('/hybrid/delete', isAuth, checkHybridOwner, async (req, res) => {
    await deleteHybrid(req.body.id);
    res.status(200).send();
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
      await unlink('public' + hybrid.url);
      await collection.updateOne({ id }, { $set: { url } });
    }
    if (grid) {
      await collection.updateOne({ id }, { $set: { grid } });
    }
  };
  app.post(
    '/hybrid/update',
    isAuth,
    checkHybridOwner,
    uploadImage,
    resizeImage,
    async (req, res) => {
      const data = { ...req.body };
      data.url = req.filepath ? req.filepath : undefined;
      await updateHybrid(data);
      res.status(200).send();
    }
  );
};
