const express = require('express');
const tourController = require('../controllers/tourController');

const tourRouter = express.Router();

tourRouter.get('/', tourController.getAllTours);
// :variable
// req.body는 클라이언트 측에서
// req.params는 API URL에서 (여기서는 :id 가 들어감))
// app.get('/api/v1/tours/:id/:a?/:b', (req, res) => {
// 위 URL에서 ?는 optional parameter
tourRouter.get('/:id', tourController.getTour);
tourRouter.post('/', tourController.createTour);
tourRouter.patch('/:id', tourController.updateTour);
tourRouter.delete('/:id', tourController.deleteTour);

module.exports = tourRouter;
