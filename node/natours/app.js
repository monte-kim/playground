import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import dotenv from 'dotenv';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import AppError from './utils/appError.js';
import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';

import ErrorController from './controllers/errorController.js';

dotenv.config({ path: './config.env' });

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

// 1. GLOBAL MIDDLEWARES
// Serving static files(HTML in public folder)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
app.use(express.static(`${__dirname}/public`));
// Security HTTP headers
app.use(helmet());

// Development logging
// ex) GET /api/v1/tours 200 4.096 ms - 8005
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100, // 100 requests from same IP
  windowMs: 60 * 60 * 1000, // 1 hour(60m * 60s * 1000ms)
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' })); //larger than 10kb, it will not be accepted

// Data sanitization against XSS(이렇게 하면 html 태그 안에 악의적인 링크를 걸어서 사용자가 클릭 시 발동하도록 할 수 있음)
app.use(xss()); // cleans any user input from malicious HTML code(ex: <script> -> &lt;script&gt;)

// Data sanitization against NoSQL query injection(ex: "$gt": "")
app.use(mongoSanitize()); // gets rid of all the "$" and "." in the req.body

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['duration', 'ratingsQuantity', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price'], // allows duration to be duplicated in query string
  })
); // removes duplicate query strings(ex: ?sort=duration&sort=price) and only uses the last one

// app.use((req, res, next) => {
//   console.log('Hello from middleware');
//   next();
// });

// test, Request time log middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3. ROUTES
app.get('/', (req, res) => {
  res.status(200).render('base');
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server.`,
  // });
  // const err = new Error(`Can't find ${req.originalUrl} on this server.`);
  // err.status = 'fail';
  // err.statusCode = 404;
  // 위 코드를 아래 코드로 변경(모듈화)
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

// Global Error Handling Middleware
const errorController = new ErrorController();
app.use(errorController.globalErrorHandler);

export default app;
