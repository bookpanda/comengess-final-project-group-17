// @ts-check

import express from 'express';
import cors from 'cors';

import bodyParser from 'body-parser';
import session from 'express-session';

import { AppError } from './utils/appError.js';
import itemsRoutes from './routes/itemRoutes.js';
import coursevilleRoutes from './routes/coursevilleRoutes.js';

const app = express();

const sessionOptions = {
  secret: 'my-secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    // setting this false for http connections
    secure: false,
  },
};

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(express.static('static'));
app.use(cors(corsOptions));
app.use(session(sessionOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/items', itemsRoutes);
app.use('/courseville', coursevilleRoutes);
app.get('/', (req, res) => {
  res.send('Congratulation. This server is successfully run.');
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

export default app;
