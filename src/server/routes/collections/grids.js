import isAuth from 'server/routes/isAuth';
import { deleteUnusedTags } from './tags';
import { cellUtils, gridUtils } from 'server/lib/collectionUtils';

const checkGridOwner = async (req, res, next) => {
  if (
    gridUtils.checkOwner(req.body.id, req.session.passport.user.id) ||
    req.session.passport.user.role === 'admin'
  ) {
    next();
  } else {
    return res.status(401).send('Unauthorized');
  }
};

export const grids = app => {
  app.post('/grid/new', isAuth(), async (req, res) => {
    const newGrid = await gridUtils.add({
      ...req.body,
      user: req.session.passport.user.id,
    });
    let cells = await Promise.all(
      req.body.lineThemes.map(async line => {
        return await Promise.all(
          req.body.colThemes.map(async col => {
            return await cellUtils.add({
              position: { line, col },
              grid: newGrid.id,
              hybrids: [],
            });
          })
        );
      })
    );

    cells = cells.flat();
    res.status(200).json({ grid: newGrid, cells: cells });
    deleteUnusedTags();
  });

  app.post('/grid/delete', isAuth(), checkGridOwner, async (req, res) => {
    const grid = await gridUtils.get(req.body.id);
    await grid.lineThemes.forEach(async line => {
      return await grid.colThemes.forEach(async col => {
        const cell = await cellUtils.findOne({ position: { line, col } });
        return await cellUtils.remove(cell.id);
      });
    });
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
