import { NODE_ENV } from '../config.js';

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};
const sendErrorProd = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

export default class ErrorController {
  globalErrorHandler = (err, req, res, next) => {
    console.log(err.stack);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (NODE_ENV === 'development') {
      sendErrorDev(err, res);
    } else if (NODE_ENV === 'production') {
      sendErrorProd(err, res);
    }
  };
}
