import express from 'express';
import errorWrapper from 'server/routes/errorWrapper';
import { serverRenderer } from 'renderers/server';
import { sessions } from 'server/routes/sessions';
import { tags } from 'server/routes/collections/tags';
import { cells } from 'server/routes/collections/cells';
import { grids } from 'server/routes/collections/grids';
import { hybrids } from 'server/routes/collections/hybrids';
import isAuth from 'server/routes/isAuth';
import dbUtils from 'server/lib/dbUtils';

const router = express.Router();
const wrapper = errorWrapper(router);

sessions(wrapper);

const mainRendering = async (req, res) => {
  const hybrids = await dbUtils.getCollectionArray('hybrids');
  const tags = await dbUtils.getCollectionArray('tags');
  const users = await dbUtils.getCollectionArray('users');
  const grids = await dbUtils.getCollectionArray('grids');
  const cells = await dbUtils.getCollectionArray('cells');
  const session = req.isAuthenticated()
    ? {
      authenticated: true,
      user: users.find(u => u.id === req.session.passport.user.id),
    }
    : { authenticated: false };
  const vars = await serverRenderer(req.url, {
    hybrids,
    tags,
    users,
    grids,
    session,
    cells,
  });
  res.render('index', vars);
};

wrapper.get(['/admin', 'admin/*'], isAuth('admin'), mainRendering);
wrapper.get(
  [
    '/home',
    '/home/*',
    '/grids',
    '/grids/*',
    '/grid/*',
    '/hybrids',
    '/hybrids/*',
    '/hybrid/*',
  ],
  isAuth(),
  mainRendering
);
wrapper.get(['/login', '/', '/register'], mainRendering);

tags(wrapper);
grids(wrapper);
cells(wrapper);
hybrids(wrapper);

/**
 * --------------GLOBAL ERROR HAndler ----------------
 */
function errorHandler(err, req, res) {
  if (!res.status) {
    res = req;
    req = err;
    err = `No response from ${req.url}`;
  }
  if (typeof err === 'string') {
    return res.status(400).json({ message: err });
  }

  return res.status(500).json({ message: err.message });
}
router.use(errorHandler);

export default router;
