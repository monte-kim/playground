import { Router } from 'express';
import TourController from '../controllers/tourController.js';
import AuthController from '../controllers/authController.js';

const tourController = new TourController();
const authController = new AuthController();
const tourRouter = Router();

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
tourRouter.delete('/:id', tourController.deleteTour);

export default tourRouter;
