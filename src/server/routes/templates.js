import { connectDB } from '../config/database';
import { v4 as uuid } from 'uuid';
import isAuth from './isAuth';
import { deleteUnusedTags } from './tags';
import collectionUtils from '../lib/collectionUtils';

const templateUtils = collectionUtils('templates', [
  'id',
  'name',
  'user',
  'lineThemes',
  'colThemes',
]);

const checkTemplateOwner = async (req, res, next) => {
  const templateId = req.body.id;
  const userId = req.session.passport.user;
  const db = await connectDB();
  const collection = db.collection('templates');
  const template = await collection.findOne({ id: templateId });
  if (template.user === userId) {
    next();
  } else {
    return res.status(401).send('Unauthorized');
  }
};

export const templates = app => {
  app.post('/template/new', isAuth, async (req, res) => {
    const newTemplate = await templateUtils.add({
      ...req.body,
      id: uuid(),
      user: req.session.passport.user,
    });
    res.status(200).json(newTemplate);
    deleteUnusedTags();
  });

  app.post('/template/delete', isAuth, checkTemplateOwner, async (req, res) => {
    await templateUtils.remove(req.body.id);
    res.status(200).send();
    deleteUnusedTags();
  });

  app.post('/template/update', isAuth, checkTemplateOwner, async (req, res) => {
    await templateUtils.update({ ...req.body });
    res.status(200).send();
    deleteUnusedTags();
  });
};
