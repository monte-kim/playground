import { Router } from 'express';
import TourController from '../controllers/tourController.js';
import AuthController from '../controllers/authController.js';
import ReviewController from '../controllers/reviewController.js';
import reviewRouter from './reviewRoutes.js';

const tourController = new TourController();
const tourRouter = Router();

const authController = new AuthController();
const reviewController = new ReviewController();

tourRouter.use('/:tourId/reviews', reviewRouter);

// tourRouter.param('id', tourController.checkID);

tourRouter.get(
  '/top-5-cheap',
  tourController.aliasTopTours,
  tourController.getAllTours
);

tourRouter.get('/', authController.protect, tourController.getAllTours);
tourRouter.get('/tour-stats', tourController.getTourStats);
tourRouter.get('/monthly-plan/:year', tourController.getMonthlyPlan);
tourRouter.post('/', tourController.createTour);

tourRouter.get('/:id', tourController.getTour);
tourRouter.patch('/:id', tourController.updateTour);
tourRouter.delete(
  '/:id',
  authController.protect,
  authController.restrictTo('admin', 'lead-guide'),
  tourController.deleteTour
);

export default tourRouter;
