import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import adRoutes from './routes/ad.js';

import { DATABASE } from './config.js';

const app = express();

// db
mongoose.set('strictQuery', false);
mongoose
  .connect(DATABASE)
  .then(() => {
    console.log('mongodb_connected.');
  })
  .catch((err) => {
    console.log(err);
  });

// middlewares
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));
app.use(cors());

// routes middleware
app.use('/api', authRoutes);
app.use('/api', adRoutes);

app.listen(8000, () => {
  console.log('server_running_on_port_8000');
});
