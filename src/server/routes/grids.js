import { connectDB } from '../config/database';
import { v4 as uuid } from 'uuid';
import isAuth from './isAuth';
import { deleteUnusedTags } from './tags';
import collectionUtils from '../lib/collectionUtils';

const gridUtils = collectionUtils('grids', [
  'id',
  'name',
  'user',
  'template',
  'isOpen',
]);

const checkGridOwner = async (req, res, next) => {
  const gridId = req.body.id;
  const userId = req.session.passport.user;
  const db = await connectDB();
  const collection = db.collection('grids');
  const grid = await collection.findOne({ id: gridId });
  if (grid.user === userId) {
    next();
  } else {
    return res.status(401).send('Unauthorized');
  }
};

export const grids = app => {
  app.post('/grid/new', isAuth(), async (req, res) => {
    const newGrid = await gridUtils.add({
      ...req.body,
      id: uuid(),
      user: req.session.passport.user,
    });
    res.status(200).json(newGrid);
    deleteUnusedTags();
  });

  app.post('/grid/delete', isAuth(), checkGridOwner, async (req, res) => {
    await gridUtils.remove(req.body.id);
    res.status(200).send();
    deleteUnusedTags();
  });

  app.post('/grid/update', isAuth(), checkGridOwner, async (req, res) => {
    await gridUtils.update({ ...req.body });
    res.status(200).send();
    deleteUnusedTags();
  });
};
