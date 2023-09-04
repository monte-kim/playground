export default class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // operational errors임을 명시해준다

    Error.captureStackTrace(this, this.constructor);
  }
}
