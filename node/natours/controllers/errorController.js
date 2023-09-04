import { NODE_ENV } from '../config.js';
import AppError from '../utils/appError.js';

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue.name;
  console.log(value);
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR🚨');
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong.',
    });
  }
};

export default class ErrorController {
  globalErrorHandler = (err, req, res, next) => {
    // console.log(err.stack);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (NODE_ENV === 'development') {
      sendErrorDev(err, res);
    } else if (NODE_ENV === 'production') {
      let error = { ...err };
      console.log(err);
      if (err.name === 'CastError') error = handleCastErrorDB(error);
      if (err.code === 11000) error = handleDuplicateFieldsDB(error);

      sendErrorProd(error, res);
    }
  };
}
