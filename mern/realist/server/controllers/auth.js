import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import validator from 'email-validator';

import * as config from '../config.js';
import { emailTemplate } from '../helpers/email.js';
import { hashPassword, comparePassword } from '../helpers/auth.js';
import User from '../models/user.js';

const tokenAndUserResponse = (req, res, user) => {
  const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
    expiresIn: '1h',
  });
  const refreshToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
    expiresIn: '7d',
  });

  // 비밀번호 및 신규 비밀번호 생성 코드는 전달하지 않는다.
  user.password = undefined;
  user.resetCode = undefined;

  return res.json({
    token,
    refreshToken,
    user,
  });
};

export const welcome = (req, res) => {
  res.json({
    data: 'Hello from Node.js api from routes.',
  });
};

export const preRegister = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;

    // validation
    if (!validator.validate(email)) {
      return res.json({ error: 'A valid email is required' });
    }
    if (!password) {
      return res.json({ error: 'Password is required' });
    } else if (password?.length < 8) {
      return res.json({ error: 'Password should be at least 8 characters' });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.json({ error: 'Email is taken' });
    }

    const token = jwt.sign({ email, password }, config.JWT_SECRET, {
      expiresIn: '1h',
    });
    config.AWSSES.sendEmail(
      emailTemplate(
        email,
        `
        <p>Please click the linnk below to activate your account.</p>
        <a href="${config.CLIENT_URL}/auth/account-activate/${token}">Activate my account</a>
      `,
        config.REPLY_TO,
        'Activ ate you account.',
      ),
      (err, data) => {
        if (err) {
          console.log(err);
          return res.json({ ok: false });
        }
        console.log(data);
        return res.json({ ok: true });
      },
    );
  } catch (err) {
    console.log(err);
    return res.json({ error: 'Something went wrong. Try again.' });
  }
};

export const register = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = jwt.verify(req.body.token, config.JWT_SECRET);

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.json({ error: 'Email is taken' });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new User({
      username: nanoid(6),
      email,
      password: hashedPassword,
    }).save();

    tokenAndUserResponse(req, res, user);
  } catch (err) {
    console.log(err);
    return res.json({ error: 'Something went wrong. Try again.' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. 이메일로 사용자 찾기
    const user = await User.findOne({ email });

    // 2. 암호 대조
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: 'Wrong password' });
    }

    // // 3. JWT 토큰 생성
    // const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
    //   expiresIn: '1h',
    // });
    // const refreshToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
    //   expiresIn: '7d',
    // });

    // // 4. 로그인 응답 보내기
    // user.password = undefined;
    // user.resetCode = undefined;

    // return res.json({
    //   token,
    //   refreshToken,
    //   user,
    // });
    tokenAndUserResponse(req, res, user);
  } catch (err) {
    console.log(err);
    return res.json({ error: 'Something went wrong. Try again.' });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: 'Could not find user with that email.' });
    } else {
      const resetCode = nanoid(); // 사용자마다 고유한 리셋 아이디
      user.resetCode = resetCode;
      user.save();

      const token = jwt.sign({ resetCode }, config.JWT_SECRET, { expiresIn: '1h' });

      config.AWSSES.sendEmail(
        emailTemplate(
          email,
          `
          <p>Please click the link below to access your account.</p>
          <a href="${config.CLIENT_URL}/auth/access-account/${token}">Access my account.</a>
        `,
          config.REPLY_TO,
          'Access your account',
        ),
        (err, data) => {
          if (err) {
            console.log(err);
            return res.json({ ok: false });
          }
          console.log(data);
          return res.json({ ok: true });
        },
      );
    }
  } catch (err) {
    console.log(err);
    return res.json({ error: 'Something went wrong. Try again.' });
  }
};

export const accessAccount = async (req, res) => {
  try {
    const { resetCode } = jwt.verify(req.body.resetCode, config.JWT_SECRET);

    const user = await User.findOneAndUpdate({ resetCode }, { resetCode: '' });

    tokenAndUserResponse(req, res, user);
  } catch (err) {
    console.log(err);
    return res.json({ error: 'Something went wrong. Try again.' });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { _id } = jwt.verify(req.headers.refresh_token, config.JWT_SECRET);
    const user = await User.findById(_id);

    tokenAndUserResponse(req, res, user);
  } catch (err) {
    console.log(err);
    return res.send(403).json({ error: 'Refresh token failed' });
  }
};

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.password = undefined;
    user.resetCode = undefined;
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.send(403).json({ error: 'Unauthorized' });
  }
};

export const publicProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    user.password = undefined;
    user.resetCode = undefined;
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.json({ error: 'Uesr not found.' });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.json({ error: 'Password is required' });
    } else if (password?.length < 6) {
      return res.json({ error: 'Password should be minimum 6 characters' });
    }

    const user = await User.findByIdAndUpdate(req.user._id, {
      password: await hashPassword(password),
    });

    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.send(403).json({ error: 'Unauthorized' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
    user.password = undefined;
    user.resetCode = undefined;
    res.json(user);
  } catch (err) {
    if (err.codeName === 'DuplicateKey') {
      return res.json({ error: 'Username / email is already taken.' });
    }
    return res.send(403).json({ error: 'Unauthorized' });
  }
};
