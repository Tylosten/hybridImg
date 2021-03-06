import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import serialize from 'serialize-javascript';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import connectMongo from 'connect-mongo';
const MongoStore = connectMongo(session);

import routes from 'server/routes';
import config from 'server/config';
import 'server/config/init-admin';
import 'server/config/passport';

/**
 * -------------- GENERAL SETUP ----------------
 */
const app = express();
app.enable('trust proxy');
app.use(morgan('common'));
app.use(express.static('public'));
app.use(express.static(path.resolve('public', 'bundles')));
app.set('view engine', 'ejs');
app.set('views', path.resolve('public', 'bundles'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: `http://${config.host}:${config.port}`,
    credentials: true,
  })
);

app.locals.serialize = serialize;

/**
 * -------------- SESSION SETUP ----------------
 */
const sessionStore = new MongoStore({
  url: config.dbString,
  collection: 'sessions',
});

app.use(
  session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

app.use(passport.initialize());
app.use(passport.session());

/**
 * -------------- ROUTES ----------------
 */
app.use(routes);

/**
 * -------------- SERVER ----------------
 */

app.listen(config.port, config.host, () => {
  console.info(`Running on ${config.host}:${config.port}...`);
});
