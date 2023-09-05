// import { promisify } from 'util';
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
      passwordChangedAt: req.body.passwordChangedAt,
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

  protect = catchAsync(async (req, res, next) => {
    // 1) Get token and check if it exists
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return next(
        new AppError('You are not logged in. Please log in to get access', 401)
      );
    }

    // 2) Verify token
    // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded =  { id: 'id 형태', iat: 8355, exp: 4755 }

    // 3) Check if user still exists
    const userFound = await User.findById(decoded.id);
    if (!userFound) {
      return next(
        new AppError('The token for this user no longer exists', 401)
      );
    }

    // 4) Check if user changed password after the token was issued
    if (userFound.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError('User recently changed password. Please log in again', 401)
      );
    }

    // To grant access to the protected route, we are simply setting the received user on the req object so req.user  and then we call next and this will take you to the next middleware in line which is the route handler itself as mentioned in the lesson. So now the user is granted the access to the protected route and then by calling next the same request (req) which has this user property attached to it is now funneled to the next middleware in line which is the route handler.
    req.user = userFound; // 인증된 토큰을 가진 사용자 정보
    // GRANT ACCESS TO PROTECTED ROUTE(위 모든 과정을 에러 없이 통과해야 다음 단계)
    next();
  });
}
