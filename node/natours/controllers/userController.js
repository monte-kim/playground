import multer from 'multer';
import sharp from 'sharp';
import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import { factory } from './handlerFactory.js';

// req.file = { fieldname: 'photo',
//   originalname: 'user-5c8a1d5b0190b214360dc032-1552617930838.jpeg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   destination: 'public/img/users',
//   filename: 'user-5c8a1d5b0190b214360dc032-1552617930838.jpeg',
//   path: 'public\\img\\users\\user-5c8a1d5b0190b214360dc032-1552617930838.jpeg',
//   size: 102400 }
// const multerStorage = multer.diskStorage({
//   destination: (req, res, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     // user-123abc123abc123abc-123123123123.jpeg
//     const ext = file.mimetype.split('/')[1]; // jpeg
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`); // cb(noErr, filename)
//   },
// });
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  // Test if file is an image
  if (file.mimetype.startsWith('image')) {
    cb(null, true); // cb(noErr, true)
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false); // cb(err, false)
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

export default class UserController {
  // ROUTE HANDLERS
  uploadUserPhoto = upload.single('photo');

  resizeUserPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/${req.file.filename}`);

    next();
  });

  getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
  };

  updateMe = catchAsync(async (req, res, next) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
      return next(new AppError('This route is not for password updates. Please use /updatePassword', 400));
    }
    // 2) Filtered out unwanted fields that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email');
    if (req.file) filteredBody.photo = req.file.filename;

    // 2) Update user document
    // const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  });

  deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

  // getUser = (req, res) => {
  //   res.status(500).json({
  //     status: 'error',
  //     message: 'This route is not yet defined.',
  //   });
  // };

  createUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not defined. Please use signup instead.',
    });
  };
  // updateUser = (req, res) => {
  //   res.status(500).json({
  //     status: 'error',
  //     message: 'This route is not yet defined.',
  //   });
  // };
  // Do NOT update passwords with this!
  // Because we need to use the save middleware to hash the password
  // deleteUser = (req, res) => {
  //   res.status(500).json({
  //     status: 'error',
  //     message: 'This route is not yet defined.',
  //   });
  // };
  getAllUsers = factory.getAll(User);
  getUser = factory.getOne(User);
  updateUser = factory.updateOne(User);
  deleteUser = factory.deleteOne(User);
}
