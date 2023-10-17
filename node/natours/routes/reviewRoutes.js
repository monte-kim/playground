import { Router } from 'express';

import ReviewController from '../controllers/reviewController.js';
import AuthController from '../controllers/authController.js';

const authController = new AuthController();
const reviewController = new ReviewController();
const reviewRouter = Router();

reviewRouter.get('/', reviewController.getAllReviews);
reviewRouter.post('/', authController.protect, authController.restrictTo('user'), reviewController.createReview);

export default reviewRouter;
