// import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import sendEmail from '../utils/email.js';

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
      role: req.body.role,
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

  // 미들웨어에 매개변수를 꼭 전달해야한다면 아래와 같이
  restrictTo = (...roles) => {
    return (req, res, next) => {
      // roles = ...['admin', 'lead-guide], req.user.role = 'user'
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError('You do not have permission to perform this action', 403)
        );
      }

      next();
    };
  };

  forgotPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(
        new AppError('There is no user with this email address', 404)
      );
    }

    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    // createPasswordResetToken은 업데이트가 아니기 때문에 한 번 저장해야함 + 유효성 검사 안 하고 저장
    await user.save({ validateBeforeSave: false });

    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Your password reset token (valid for 10min)',
        message,
      });

      res.status(200).json({
        status: 'success',
        message: 'Token sent to email',
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpiresIn = undefined;
      await user.save({ validateBeforeSave: false });
      return next(
        new AppError('There was an error sending the email. Try again later!'),
        500
      );
    }
  });
  resetPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on the tokens
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpiresIn: { $gt: Date.now() },
    });

    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
      return next(new AppError('Token is invalid or has expired'), 400);
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpiresIn = undefined;
    // save를 활용하는 이유는 모든 유효성 검사를 하기 위함(비밀번호는 유효성 검사 반드시 필요)
    await user.save();

    // 3) Update changePasswordAt property for the user
    // 4) Log the user in, send JWT
    const token = signToken(user._id);

    res.status(200).json({
      status: 'success',
      token,
    });
  });
}
