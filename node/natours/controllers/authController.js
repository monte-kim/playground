import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export default class AuthController {
  signup = async (req, res, next) => {
    try {
      // const newUser = await User.create(req.body);
      // 위에 방식으로 진행하는 경우 아무나 관리자 권한으로 로그인이 가능해진다.
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
      });
      const token = signToken(user._id);
      res.status(201).json({
        status: 'success',
        token,
        data: {
          user: newUser,
        },
      });
    } catch (err) {
      res.send({
        message: err,
      });
    }
    // next();
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      console.log('hello');
      // 1) check if email & pw exists
      if (!email || !password) {
        return res.status(400).json({ error: 'Must have email and password' });
      }

      // 2) check if user exists && password correct
      const user = await User.findOne({ email }).select('+password');
      if (!user || !(await user.correctPassword(password, user.password))) {
        // 이메일과 비밀번호 둘 다 같이 검사를 하는 이유는 해커에게 정보를 최소한으로 주기 위함이다
        return res.status(401).json({ error: 'Incorrect email or password' });
      }
      console.log('hello');

      // 3) if ok, send token to front
      const token = signToken(user._id);
      console.log(user);
      console.log(token);

      res.status(200).json({
        status: 'success',
        token,
      });
    } catch (err) {
      res.send(err);
    }
  };
}
