import { Router } from 'express';
import TourController from '../controllers/tourController.js';

const tourController = new TourController();
const tourRouter = Router();

// tourRouter.param('id', tourController.checkID);

tourRouter.get(
  '/top-5-cheap',
  tourController.aliasTopTours,
  tourController.getAllTours
);

tourRouter.get('/', tourController.getAllTours);
// :variable
// req.body는 클라이언트 측에서
// req.params는 API URL에서 (여기서는 :id 가 들어감))
// app.get('/api/v1/tours/:id/:a?/:b', (req, r es) => {
// 위 URL에서 ?는 optional parameter
tourRouter.get('/tour-stats', tourController.getTourStats);
tourRouter.get('/monthly-plan/:year', tourController.getMonthlyPlan);
tourRouter.post('/', tourController.createTour);

tourRouter.get('/:id', tourController.getTour);
tourRouter.patch('/:id', tourController.updateTour);
tourRouter.delete('/:id', tourController.deleteTour);

export default tourRouter;
