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
import { hybrids } from './hybrids';
import defaultState from './defaultState';

const app = express();
app.enable('trust proxy');
app.use(morgan('common'));
app.use(express.static('public'));

app.use(cors());

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

hybrids(app);

app.locals.serialize = serialize;

try {
  app.locals.gVars = require('../../.reactful.json');
} catch (err) {
  app.locals.gVars = {};
}

app.get(
  ['/', '/home', '/hybrids', '/grids', '/hybrid/*', '/grid/*'],
  async (req, res) => {
    try {
      const vars = await serverRenderer(req.url);
      res.render('index', vars);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
);

const getCollectionArray = async name => {
  const db = await connectDB();
  return db
    .collection(name)
    .find()
    .toArray();
};
app.get('/data', async (req, res) => {
  const hybrids = await getCollectionArray('hybrids');
  const tags = await getCollectionArray('tags');
  const users = await getCollectionArray('users');
  const grids = await getCollectionArray('grids');
  res.status(200).json({ hybrids, tags, users, grids });
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
