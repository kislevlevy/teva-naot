export default class AppError extends Error {
  constructor(statusCode, message) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;
    this.status = String(statusCode).startsWith(4) ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
