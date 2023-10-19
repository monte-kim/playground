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

tourRouter.get('/top-5-cheap', tourController.aliasTopTours, tourController.getAllTours);

tourRouter.get('/', tourController.getAllTours);
tourRouter.get('/tour-stats', tourController.getTourStats);
tourRouter.get(
  '/monthly-plan/:year',
  authController.protect,
  authController.restrictTo('admin', 'lead-guide', 'guide'),
  tourController.getMonthlyPlan
);

// this api gets the tours within a certain distance from a certain point
tourRouter.get('/tours-within/:distance/center/:latlng/unit/:unit', tourController.getToursWithin);

tourRouter.get('/distances/:latlng/unit/:unit', tourController.getDistances);

tourRouter.post(
  '/',
  authController.protect,
  authController.restrictTo('admin', 'lead-guide'),
  tourController.createTour
);

tourRouter.get('/:id', tourController.getTour);
tourRouter.patch(
  '/:id',
  authController.protect,
  authController.restrictTo('admin', 'lead-guide'),
  tourController.updateTour
);

tourRouter.delete(
  '/:id',
  authController.protect,
  authController.restrictTo('admin', 'lead-guide'),
  tourController.deleteTour
);

export default tourRouter;
