import Review from '../models/reviewModel.js';
// import catchAsync from '../utils/catchAsync.js';
import { factory } from './handlerFactory.js';

export default class ReviewController {
  // getAllReviews = catchAsync(async (req, res, next) => {
  //   let filter = {};
  //   if (req.params.tourId) filter = { tour: req.params.tourId };

  //   const reviews = await Review.find(filter);

  //   res.status(200).json({
  //     status: 'success',
  //     results: reviews.length,
  //     data: { reviews },
  //   });
  // });

  setTourUserIds = (req, res, next) => {
    // allow nested routes
    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
  };

  // createReview = catchAsync(async (req, res, next) => {
  //   const newReview = await Review.create(req.body);

  //   res.status(201).json({
  //     status: 'success',
  //     data: { review: newReview },
  //   });
  // });
  getAllReviews = factory.getAll(Review);
  getReview = factory.getOne(Review);
  createReview = factory.createOne(Review);
  updateReview = factory.updateOne(Review);
  deleteReview = factory.deleteOne(Review);
}
