const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// ROUTES
const userRouter = express.Router();

userRouter.post('/signup', authController.signup);

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUser);
userRouter.post('/', userController.createUser);
userRouter.patch('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter;
