import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export default class AuthController {
  signup = async (req, res, next) => {
    try {
      // const newUser = await User.create(req.body);
      // 위에 방식으로 진행하는 경우 아무나 관리자 권한으로 로그인이 가능해진다.
      const newUser = await User.create({
        name: req.body.name,
        email: req.bodyy.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
      });

      const token = jwt.sign({ id: newUser._id }, '');

      res.status(201).json({
        status: 'success',
        data: {
          user: newUser,
        },
      });
    } catch (err) {
      res.send({
        message: err,
      });
    }
    next();
  };
}
