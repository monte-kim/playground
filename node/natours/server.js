import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION 🚨\nshutting down...');
  process.exit(1);
});

// import crypto from 'crypto';
// const generateRandomString = (length) => {
//   return crypto.randomBytes(length).toString('hex');
// };
// const JWT_SECRET_KEY = generateRandomString(32);

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

console.log(`Server runs as "${process.env.NODE_ENV}" mode`);

// START SERVER
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}.\nhttp://localhost:${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLER REJECTION 🚨\nshutting down...');
  server.close(() => {
    process.exit(1);
  });
});
