import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import validator from 'email-validator';

import * as config from '../config.js';
import { emailTemplate } from '../helpers/email.js';
import { hashPassword, comparePassword } from '../helpers/auth.js';
import User from '../models/user.js';

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

    const hashedPassword = await hashPassword(password);

    const user = await new User({
      username: nanoid(6),
      email,
      password: hashedPassword,
    }).save();

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
  } catch (err) {
    console.log(err);
    return res.json({ error: 'Something went wrong. Try again.' });
  }
};

export const login = async (req, res) => {
  try {
  } catch (err) {}
};
