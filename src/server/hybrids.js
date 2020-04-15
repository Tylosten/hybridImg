import { connectDB } from './connect-db';

export const hybrids = app => {
  const addNewHybrid = async hybrid => {
    const db = await connectDB();
    const collection = db.collection('hybrids');
    await collection.insertOne(hybrid);
  };
  app.post('/hybrids/new', async (req, res) => {
    const hybrid = req.body.hybrid;
    await addNewHybrid(hybrid);
    res.status(200).send();
  });

  const saveHybrid = async hybrid => {
    const db = await connectDB();
    const collection = db.collection('hybrids');
    await collection.save(hybrid);
  };
  app.post('/hybrids/save', async (req, res) => {
    const hybrid = req.body.hybrid;
    await saveHybrid(hybrid);
    res.status(200).send();
  });

  const findAllHybrids = async () => {
    const db = await connectDB();
    return db
      .collection('hybrids')
      .find()
      .toArray();
  };
  app.get('/hybrids/findAll', async (req, res) => {
    const hybrids = await findAllHybrids();
    res.status(200).json(hybrids);
  });

  const findHybrids = async (user, tags) => {
    const search = {};
    if (user) {
      search.user = user;
    }
    if (tags) {
      search.tags = { $all: (tags = tags.split(',')) };
    }
    const db = await connectDB();
    return db
      .collection('hybrids')
      .find(search)
      .toArray();
  };
  app.get('/hybrids/find', async (req, res) => {
    const { user, tags } = req.query;
    const hybrids = await findHybrids(user, tags);
    res.status(200).json(hybrids);
  });

  const updateHybrid = async hybrid => {
    const { id, tags, url, user } = hybrid;
    const db = await connectDB();
    const collection = db.collection('hybrids');

    if (user) {
      await collection.updateOne({ id }, { $set: { user } });
    }
    if (tags) {
      await collection.updateOne({ id }, { $set: { tags } });
    }
    if (url) {
      await collection.updateOne({ id }, { $set: { url } });
    }
  };
  app.post('/hybrids/update', async (req, res) => {
    const hybrid = req.body.hybrid;
    await updateHybrid(hybrid);
    res.status(200).send();
  });
};
