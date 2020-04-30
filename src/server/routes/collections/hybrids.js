import isAuth from 'server/routes/isAuth';
import { uploadImage, resizeImage } from 'server/routes/imgUpload';
import { deleteUnusedTags } from 'server/routes/collections/tags';
import { hybridUtils, cellUtils } from 'server/lib/collectionUtils';
import fs from 'fs';
import util from 'util';
const unlink = util.promisify(fs.unlink);

const deleteHybridImage = async id => {
  const hybrid = await hybridUtils.get(id);
  await unlink('public' + hybrid.url);
};

const checkHybridOwner = async (req, res, next) => {
  if (
    (hybridUtils.checkOwner(req.body.id), req.user.id) ||
    req.session.passport.user.role === 'admin'
  ) {
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
        throw new Error('Le fichier image n\'a pas été reçu');
      }

      const newHybrid = await hybridUtils.add({
        ...req.body,
        user: req.session.passport.user.id,
        url: req.filepath,
        tags: req.body.tags ? req.body.tags.split(',') : [],
      });
      res.status(200).json(newHybrid);
      deleteUnusedTags();
    }
  );

  app.post('/hybrid/delete', isAuth(), checkHybridOwner, async (req, res) => {
    const hybridId = req.body.id;
    const cells = await cellUtils.find({
      hybrids: { $elemMatch: { $eq: hybridId } },
    });
    await cells.forEach(async c => {
      await cellUtils.update({
        id: c.id,
        hybrids: c.hybrids.filter(h => h !== hybridId),
      });
    });
    await deleteHybridImage(req.body.id);
    await hybridUtils.remove(hybridId);
    res.status(200).send();
    deleteUnusedTags();
  });

  app.post(
    '/hybrid/update',
    isAuth(),
    uploadImage,
    resizeImage,
    async (req, res) => {
      const data = { ...req.body };
      if (req.filepath) {
        await deleteHybridImage(req.body.id);
        data.url = req.filepath;
      }
      const hybrid = await hybridUtils.update({
        ...data,
        tags: data.tags ? data.tags.split(',') : [],
      });
      res.status(200).json(hybrid);
      deleteUnusedTags();
    }
  );
};
