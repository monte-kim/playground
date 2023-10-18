import { Router } from 'express';

import ReviewController from '../controllers/reviewController.js';
import AuthController from '../controllers/authController.js';

const authController = new AuthController();
const reviewController = new ReviewController();
// mergeParams allows us to access the tourId from the tour router
const reviewRouter = Router({ mergeParams: true });

// POST /tour/234fad4/reviews
// GET /reviews

reviewRouter.use(authController.protect);
reviewRouter.get('/', reviewController.getAllReviews);
reviewRouter.get('/:id', reviewController.getReview);
reviewRouter.post(
  '/',
  authController.restrictTo('user'),
  reviewController.setTourUserIds,
  reviewController.createReview
);
reviewRouter.patch(
  '/:id',
  authController.restrictTo('user', 'admin'),
  reviewController.updateReview
);
reviewRouter.delete(
  '/:id',
  authController.restrictTo('user', 'admin'),
  reviewController.deleteReview
);

export default reviewRouter;
