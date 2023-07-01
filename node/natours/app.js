const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 8080;

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from middleware');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// ROUTE HANDLERS
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};
const getTour = (req, res) => {
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
};
const createTour = (req, res) => {
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
};
const updateTour = (req, res) => {
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
};
const deleteTour = (req, res) => {
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
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

// ROUTES
app.get('/api/v1/tours', getAllTours);
// :variable
// req.body는 클라이언트 측에서
// req.params는 API URL에서 (여기서는 :id 가 들어감))
// app.get('/api/v1/tours/:id/:a?/:b', (req, res) => {
// 위 URL에서 ?는 optional parameter
app.get('/api/v1/tours/:id', getTour);
app.post('/api/v1/tours', createTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);

app.get('/api/v1/users', getAllUsers);
app.get('/api/v1/users/:id', getUser);
app.post('/api/v1/users', createUser);
app.patch('/api/v1/users/:id', updateUser);
app.delete('/api/v1/users/:id', deleteUser);

// START SERVER
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
