import isAuth from 'server/routes/isAuth';
import { tagUtils, gridUtils, hybridUtils } from 'server/lib/collectionUtils';

const checkTagUse = async tag => {
  const template = await gridUtils.findOne({
    $or: [
      { lineThemes: { $elemMatch: { $eq: tag.id } } },
      { colThemes: { $elemMatch: { $eq: tag.id } } },
    ],
  });
  if (template) {
    return true;
  }

  const hybrid = await hybridUtils.findOne({
    tags: { $elemMatch: { $eq: tag.id } },
  });
  if (hybrid) {
    return true;
  }

  return false;
};

export const deleteUnusedTags = async () => {
  const tags = await tagUtils.all();
  tags.forEach(async tag => {
    if (!(await checkTagUse(tag))) {
      console.info('Removing unused tag', tag.name);
      tagUtils.remove(tag.id);
    }
  });
};

export const tags = app => {
  app.post('/tag/new', isAuth(), async (req, res) => {
    const newTag = await tagUtils.add({
      ...req.body,
    });
    return res.status(200).json(newTag);
  });

  app.post('/tag/delete', isAuth(), async (req, res) => {
    await tagUtils.remove(req.body.id);
    return res.status(200).send();
  });
};
