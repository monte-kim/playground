import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/api', (req, res) => {
  res.json({
    data: 'Hello from Node.js api.',
  });
});

app.listen(8000, () => {
  console.log('server_running_on_port_8000');
});
