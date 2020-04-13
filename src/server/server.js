import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import serialize from 'serialize-javascript';
import { connectDB } from './connect-db';

import config from 'server/config';
import { serverRenderer } from 'renderers/server';

const app = express();
app.enable('trust proxy');
app.use(morgan('common'));

app.use(express.static('public'));

app.use(cors());

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.locals.serialize = serialize;

try {
  app.locals.gVars = require('../../.reactful.json');
} catch (err) {
  app.locals.gVars = {};
}

app.get('/', async (req, res) => {
  try {
    const vars = await serverRenderer();
    res.render('index', vars);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export const findAllHybrids = async () => {
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

export const findHybrids = async (author, tags) => {
  const search = {};
  if (author) {
    search.author = author;
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
  const { author, tags } = req.query;
  const hybrids = await findHybrids(author, tags);
  res.status(200).json(hybrids);
});

export const addNewHybrid = async hybrid => {
  const db = await connectDB();
  const collection = db.collection('hybrids');
  await collection.insertOne(hybrid);
};
app.post('/hybrids/new', async (req, res) => {
  const hybrid = req.body.hybrid;
  await addNewHybrid(hybrid);
  res.status(200).send();
});

export const saveHybrid = async hybrid => {
  const db = await connectDB();
  const collection = db.collection('hybrids');
  await collection.save(hybrid);
};
app.post('/hybrids/save', async (req, res) => {
  const hybrid = req.body.hybrid;
  await saveHybrid(hybrid);
  res.status(200).send();
});

export const updateHybrid = async hybrid => {
  const { id, tags, url, author } = hybrid;
  const db = await connectDB();
  const collection = db.collection('hybrids');

  if (author) {
    await collection.updateOne({ id }, { $set: { author } });
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

app.listen(config.port, config.host, () => {
  fs.writeFileSync(
    path.resolve('.reactful.json'),
    JSON.stringify(
      { ...app.locals.gVars, host: config.host, port: config.port },
      null,
      2
    )
  );

  console.info(`Running on ${config.host}:${config.port}...`);
});
