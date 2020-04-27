import isAuth from 'server/routes/isAuth';
import { deleteUnusedTags } from 'server/routes/collections/tags';
import { cellUtils, gridUtils } from 'server/lib/collectionUtils';

const checkCellOwner = async (req, res, next) => {
  const cell = await cellUtils.get(req.body.id);
  if (gridUtils.checkOwner(cell.grid, req.session.passport.user.id)) {
    next();
  } else {
    return res.status(401).send('Unauthorized');
  }
};

export const cells = app => {
  app.post('/cell/new', isAuth(), async (req, res) => {
    const newCell = await cellUtils.add({
      ...req.body,
      user: req.session.passport.user.id,
    });
    res.status(200).json(newCell);
    deleteUnusedTags();
  });

  app.post('/cell/delete', isAuth(), checkCellOwner, async (req, res) => {
    await cellUtils.remove(req.body.id);
    res.status(200).send();
    deleteUnusedTags();
  });

  app.post('/cell/update', isAuth(), checkCellOwner, async (req, res) => {
    //remove duplicates
    req.body.hybrids = [...new Set(req.body.hybrids)];
    await cellUtils.update({ ...req.body });
    res.status(200).send();
    deleteUnusedTags();
  });
};
