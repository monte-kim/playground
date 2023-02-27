import * as config from '../config.js';
import jwt from 'jsonwebtoken';

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
      {
        Source: config.EMAIL_FROM,
        Destination: {
          ToAddresses: ['monte6198@gmail.com'],
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: `
                <html>
                  <h1>Welcome to Realist App</h1>
                  <p>Please click the linnk below to activate your account.</p>
                  <a href="${config.CLIENT_URL}/auth/account-activate/${token}">Activate my account</a>
                </html>
              `,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: 'Welcome to Realist',
          },
        },
      },
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
