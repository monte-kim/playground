import Tour from '../models/tourModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import { factory } from './handlerFactory.js';
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

//  checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price',
//     });
//   }
//   next();
// };

export default class TourController {
  aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratinsAverage,summary,difficulty';
    next();
  };

  getAllTours = factory.getAll(Tour);
  getTour = factory.getOne(Tour, { path: 'reviews' });
  createTour = factory.createOne(Tour);
  updateTour = factory.updateOne(Tour);
  deleteTour = factory.deleteOne(Tour);

  // getAllTours = catchAsync(async (req, res, next) => {
  //   const features = new APIFeatures(Tour.find(), req.query)
  //     .filter()
  //     .sort()
  //     .limitFields()
  //     .paginate();
  //   const tours = await features.query; // 이렇게 분리하는 것은 위에서 sorting, limiting 과 같은 다양한 함수를 요구에 따라 추가하기 위함

  //   res.status(200).json({
  //     status: 'success',
  //     requestedAt: req.requestTime,
  //     results: tours.length,
  //     data: { tours },
  //   });
  // });

  // getTour = catchAsync(async (req, res, next) => {
  //   const tour = await Tour.findById(req.params.id).populate('reviews');
  //   // Tour.findOne({ _id: req.params.id });

  //   if (!tour) {
  //     return next(new AppError('No tour found with that ID', 404));
  //   }

  //   res.status(200).json({
  //     status: 'success',
  //     data: { tour },
  //   });
  // });

  // createTour = catchAsync(async (req, res, next) => {
  //   // const newTour = new Tour({});
  //   // newTour.save();
  //   const newTour = await Tour.create(req.body);

  //   res.status(201).json({
  //     status: 'success',
  //     data: { tour: newTour },
  //   });
  // });

  // patch는 req.body와 DB가 다른 부분만 업데이트 해줌
  // updateTour = catchAsync(async (req, res, next) => {
  //   const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
  //     new: true,
  //     runValidators: true,
  //   });

  //   if (!tour) {
  //     return next(new AppError('No tour found with that ID', 404));
  //   }

  //   res.status(200).json({
  //     status: 'success',
  //     data: {
  //       tour,
  //     },
  //   });
  // });

  // deleteTour = catchAsync(async (req, res, next) => {
  //   // 삭제 관련 API에서는 클라이언트에게 다시 전송하는 데이터는 없음
  //   const tour = await Tour.findByIdAndDelete(req.params.id);

  //   if (!tour) {
  //     return next(new AppError('No tour found with that ID', 404));
  //   }

  //   res.status(204).json({
  //     status: 'success',
  //     data: null,
  //   });
  // });

  getTourStats = catchAsync(async (req, res, next) => {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numberOfTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      { $sort: { avgPrice: 1 } },
      { $match: { _id: { $ne: 'EASY' } } },
    ]);

    res.status(200).json({
      status: 'success',
      data: { stats },
    });
  });

  getMonthlyPlan = catchAsync(async (req, res, next) => {
    const year = req.params.year * 1;

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numberOfTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: {
          month: '$_id',
        },
      },
      { $project: { _id: 0 } },
      { $sort: { numberOfTourStarts: -1 } },
      // { $limit: 2 },
    ]);

    res.status(200).json({
      status: 'success',
      data: { plan },
    });
  });

  // '/tours-within/:distance/center/:latlng/unit/:unit'
  // '/tours-within/233/center/37.58542,126.9969/unit/mi'
  getToursWithin = catchAsync(async (req, res, next) => {
    const { distance, latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');

    // radius of the earth = 3963.2 mi or 6378.1 km
    // radian = distance / radius is the angle of the circle
    const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

    if (!lat || !lng) {
      next(new AppError('Please provide latitude and longitude in the format lat,lng.', 400));
    }

    const tours = await Tour.find({
      startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
    });

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        data: tours,
      },
    });
  });

  getDistances = catchAsync(async (req, res, next) => {
    const { latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');

    const distanceMultiplier = unit === 'mi' ? 0.000621371 : 0.001;

    if (!lat || !lng) {
      next(new AppError('Please provide latitude and longitude in the format lat,lng.', 400));
    }

    const distances = await Tour.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [lng * 1, lat * 1],
          },
          distanceField: 'distance',
          distanceMultiplier: distanceMultiplier, // convert meter to km
        },
      },
      {
        $project: {
          distance: 1,
          name: 1,
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        data: distances,
      },
    });
  });
}
