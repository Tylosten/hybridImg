import { connectDB } from './connect-db';

export const hybrids = app => {
  const addNewHybrid = async hybrid => {
    const db = await connectDB();
    const collection = db.collection('hybrids');
    await collection.insertOne(hybrid);
    return hybrid;
  };
  app.post('/hybrid/new', async (req, res) => {
    const newHybrid = await addNewHybrid(req.body);
    res.status(200).json(newHybrid);
  });

  const deleteHybrid = async hybridId => {
    const db = await connectDB();
    const collection = db.collection('hybrids');
    await collection.deleteOne({ id: hybridId });
  };
  app.delete('/hybrid/:id', async (req, res) => {
    await deleteHybrid(req.params.id);
    res.status(200).send();
  });

  const saveHybrid = async hybrid => {
    const db = await connectDB();
    const collection = db.collection('hybrids');
    await collection.save(hybrid);
  };
  app.post('/hybrid/save', async (req, res) => {
    const hybrid = req.body.hybrid;
    await saveHybrid(hybrid);
    res.status(200).send();
  });

  const updateHybrid = async hybrid => {
    const { id, name, tags, url, user, grid } = hybrid;
    const db = await connectDB();
    const collection = db.collection('hybrids');

    if (name) {
      await collection.updateOne({ id }, { $set: { name } });
    }
    if (user) {
      await collection.updateOne({ id }, { $set: { user } });
    }
    if (tags) {
      await collection.updateOne({ id }, { $set: { tags } });
    }
    if (url) {
      await collection.updateOne({ id }, { $set: { url } });
    }
    if (grid) {
      await collection.updateOne({ id }, { $set: { grid } });
    }
  };
  app.post('/hybrid/update', async (req, res) => {
    await updateHybrid(req.body);
    res.status(200).send();
  });
};
