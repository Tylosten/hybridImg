import { connectDB } from '../config/database';
import { v4 as uuid } from 'uuid';
import isAuth from './isAuth';

import collectionUtils from '../lib/collectionUtils';

const tagUtils = collectionUtils('tags', ['id', 'name']);

const checkTagUse = async tag => {
  const db = await connectDB();

  const template = await db.collection('templates').findOne({
    $or: [
      { lineThemes: { $elemMatch: { $eq: tag.id } } },
      { colThemes: { $elemMatch: { $eq: tag.id } } },
    ],
  });
  if (template) {
    return true;
  }

  const hybrid = await db
    .collection('hybrids')
    .findOne({ tags: { $elemMatch: { $eq: tag.id } } });
  if (hybrid) {
    return true;
  }

  return false;
};

export const deleteUnusedTags = async () => {
  const db = await connectDB();
  const tags = await db
    .collection('tags')
    .find()
    .toArray();
  tags.forEach(async tag => {
    if (!(await checkTagUse(tag))) {
      console.info('Removing unused tag', tag.name);
      tagUtils.remove(tag.id);
    }
  });
};

export const tags = app => {
  app.post('/tag/new', isAuth, async (req, res) => {
    const newTag = await tagUtils.add({
      ...req.body,
      id: uuid(),
    });
    res.status(200).json(newTag);
  });

  app.post('/tag/delete', isAuth, async (req, res) => {
    await tagUtils.remove(req.body.id);
    res.status(200).send();
  });
};
