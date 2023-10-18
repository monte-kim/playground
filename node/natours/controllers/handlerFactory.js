import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import APIFeatures from '../utils/apiFeatures.js';

export const factory = {
  deleteOne: (Model) =>
    catchAsync(async (req, res, next) => {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) {
        return next(
          new AppError(
            `No ${Model.modelName.toLowerCase()} found with that ID`,
            404
          )
        );
      }

      res.status(204).json({
        status: 'success',
        data: null,
      });
    }),
  updateOne: (Model) =>
    catchAsync(async (req, res, next) => {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!doc) {
        return next(
          new AppError(
            `No ${Model.modelName.toLowerCase()} found with that ID`,
            404
          )
        );
      }

      res.status(200).json({
        status: 'success',
        data: {
          doc,
        },
      });
    }),

  createOne: (Model) =>
    catchAsync(async (req, res, next) => {
      // const newTour = new Tour({});
      // newTour.save();
      const docType = Model.modelName.toLowerCase();
      const newDoc = await Model.create(req.body);
      const responseData = {};
      responseData[docType] = newDoc;

      res.status(201).json({
        status: 'success',
        data: responseData,
      });
    }),

  getOne: (Model, populateOptions) =>
    catchAsync(async (req, res, next) => {
      let query = Model.findById(req.params.id);
      if (populateOptions) query = query.populate(populateOptions);
      const doc = await query;

      if (!doc) {
        return next(
          new AppError(
            `No ${Model.modelName.toLowerCase()} found with that ID`,
            404
          )
        );
      }

      res.status(200).json({
        status: 'success',
        data: doc,
      });
    }),

  getAll: (Model) =>
    catchAsync(async (req, res, next) => {
      // To allow for nested GET reviews on tour (hack)
      let filter = {};
      if (req.params.tourId) filter = { tour: req.params.tourId };

      const features = new APIFeatures(Model.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const doc = await features.query; // 이렇게 분리하는 것은 위에서 sorting, limiting 과 같은 다양한 함수를 요구에 따라 추가하기 위함

      res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: doc.length,
        data: doc,
      });
    }),
};
