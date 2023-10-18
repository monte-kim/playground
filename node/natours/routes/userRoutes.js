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

userRouter.use(authController.protect);
userRouter.patch('/updatePassword', authController.updatePassword);
userRouter.patch('/updateMe', userController.updateMe);
userRouter.delete('/deleteMe', userController.deleteMe);

// getMe is a middleware that sets req.params.id = req.user.id
userRouter.get('/me', userController.getMe, userController.getUser);

userRouter.use(authController.restrictTo('admin'));
userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userController.createUser);
userRouter.get('/:id', userController.getUser);
userRouter.patch('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;
