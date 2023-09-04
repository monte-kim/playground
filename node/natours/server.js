import mongoose from 'mongoose';
import { DATABASE, DATABASE_PASSWORD, PORT } from './config.js';
import app from './app.js';

const DB = DATABASE.replace('<PASSWORD>', DATABASE_PASSWORD);
mongoose.connect(DB).then(() => console.log('DB connection successful!'));

// START SERVER
const port = PORT || 8080;
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
