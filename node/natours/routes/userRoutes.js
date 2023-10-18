import { Router } from 'express';
import UserController from '../controllers/userController.js';
import AuthController from '../controllers/authController.js';
import ReviewController from '../controllers/reviewController.js';

const userController = new UserController();
const authController = new AuthController();

// ROUTES
const userRouter = Router();

userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);
userRouter.post('/forgotPassword', authController.forgotPassword);
userRouter.patch('/resetPassword/:token', authController.resetPassword);
userRouter.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword
);
userRouter.patch('/updateMe', authController.protect, userController.updateMe);
userRouter.delete('/deleteMe', authController.protect, userController.deleteMe);

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUser);
userRouter.post('/', userController.createUser);
userRouter.patch(
  '/:id',
  // authController.restrictTo('admin'),
  userController.updateUser
);
userRouter.delete(
  '/:id',
  // authController.restrictTo('admin'),
  userController.deleteUser
);

export default userRouter;
