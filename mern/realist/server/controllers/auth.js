import jwt from 'jsonwebtoken';

import * as config from '../config.js';
import { emailTemplate } from '../helpers/email.js';

export const welcome = (req, res) => {
  res.json({
    data: 'Hello from Node.js api from routes.',
  });
};

export const preRegister = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
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
    console.log(req.body);
  } catch (err) {
    console.log(err);
    return res.json({ error: 'Something went wrong. Try again.' });
  }
};
