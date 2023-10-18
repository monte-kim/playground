import { Router } from 'express';

import ReviewController from '../controllers/reviewController.js';
import AuthController from '../controllers/authController.js';

const authController = new AuthController();
const reviewController = new ReviewController();
// mergeParams allows us to access the tourId from the tour router
const reviewRouter = Router({ mergeParams: true });

// POST /tour/234fad4/reviews
// GET /reviews

reviewRouter.get('/', reviewController.getAllReviews);
reviewRouter.get('/:id', reviewController.getReview);
reviewRouter.post(
  '/',
  authController.protect,
  authController.restrictTo('user'),
  reviewController.setTourUserIds,
  reviewController.createReview
);
reviewRouter.delete('/:id', reviewController.deleteReview);
reviewRouter.patch('/:id', reviewController.updateReview);

export default reviewRouter;
