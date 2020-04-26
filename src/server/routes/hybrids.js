import { connectDB } from '../config/database';
import { v4 as uuid } from 'uuid';
import isAuth from './isAuth';
import { uploadImage, resizeImage } from './imgUpload';
import fs from 'fs';
import util from 'util';
const unlink = util.promisify(fs.unlink);
import { deleteUnusedTags } from './tags';
import collectionUtils from '../lib/collectionUtils';

const hybridUtils = collectionUtils('hybrids', [
  'id',
  'name',
  'user',
  'tags',
  'grid',
  'url',
]);

const deleteHybridImage = async id => {
  const db = await connectDB();
  const collection = db.collection('hybrids');
  const hybrid = await collection.findOne({ id: id });
  await unlink('public' + hybrid.url);
};

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

export const hybrids = app => {
  app.post(
    '/hybrid/new',
    isAuth(),
    uploadImage,
    resizeImage,
    async (req, res) => {
      if (!req.file) {
        throw 'File wasn\'t uploaded';
      }

      const newHybrid = await hybridUtils.add({
        ...req.body,
        id: uuid(),
        user: req.session.passport.user,
        url: req.filepath,
        tags: req.body.tags.split(','),
      });
      res.status(200).json(newHybrid);
      deleteUnusedTags();
    }
  );

  app.post('/hybrid/delete', isAuth(), checkHybridOwner, async (req, res) => {
    await hybridUtils.remove(req.body.id);
    res.status(200).send();
    deleteUnusedTags();
  });

  app.post(
    '/hybrid/update',
    isAuth(),
    checkHybridOwner,
    uploadImage,
    resizeImage,
    async (req, res) => {
      const data = { ...req.body };
      if (req.filepath) {
        await deleteHybridImage(req.body.id);
        data.url = req.filepath;
      }
      await hybridUtils.update(data);
      res.status(200).send();
      deleteUnusedTags();
    }
  );
};
