const fs = require('fs');
const express = require('express');

const app = express();
const port = 8080;

app.use(express.json());

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello from the server.', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint.');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
});

// :variable
// req.body는 클라이언트 측에서
// req.params는 API URL에서 (여기서는 :id 가 들어감))

// app.get('/api/v1/tours/:id/:a?/:b', (req, res) => {
// 위 URL에서 ?는 optional parameter
app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  const id = Number(req.params.id);

  const tour = tours.find((el) => el.id === id);

  // if (id > tours.length - 1) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    // results: tours.length,
    data: { tour },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: { tour: newTour },
      });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id > tours.length - 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: `Updated tour #${req.params.id}`,
    },
  });
});

app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id > tours.length - 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
