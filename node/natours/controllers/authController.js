import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export default class AuthController {
  signup = catchAsync(async (req, res, next) => {
    // const newUser = await User.create(req.body);
    // 위에 방식으로 진행하는 경우 아무나 관리자 권한으로 로그인이 가능해진다.
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    const token = signToken(newUser._id);
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  });

  login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    // 1) check if email & pw exists
    if (!email || !password) {
      return next(new AppError('Please provide email and password.', 400));
    }

    // 2) check if user exists && password correct
    const user = await User.findOne({ email }).select('+password');
    console.log(user);
    if (!user || !(await user.correctPassword(password, user.password))) {
      // 이메일과 비밀번호 둘 다 같이 검사를 하는 이유는 해커에게 정보를 최소한으로 주기 위함이다
      return next(new AppError('Incorrect email or password', 401));
    }

    // 3) if ok, send token to front
    const token = signToken(user._id);

    res.status(200).json({
      status: 'success',
      token,
    });
  });
}
