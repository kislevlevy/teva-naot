export default (err, req, res, next) => {
  const { status = 'fail', statusCode = 500, message = '' } = err;
  console.log(err);

  res.status(statusCode).json({
    status: status,
    message: message,
  });
};
// // export default (err, req, res, next) => {
// //   const { status = 'fail', statusCode = 500, message = '' } = err;
// //   console.log(err);

// //   res.status(statusCode).json({
// //     status: status,
// //     message: message,
// //   });
// // };
// // Modules imports:
import AppError from '../utils/appError.js';

// /////////////////////////////////////////////////////////////////////////////////////
// // Helpers functions:
// // Development:
// const sendErrorDev = (err, res) => {
//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//     stack: err.stack,
//     error: err,
//   });
// };
// err.status = err.status || "error";

// // Api response:
// // Development error:
// if (process.env.NODE_ENV === "development") {
//   sendErrorDev(err, res);

//   // Production error:
// } else if (process.env.NODE_ENV === "production") {
//   // Duplicate error object:
//   let prodError = Object.create(err);

//   // Cast error:
//   if (err.name === "CastError") prodError = handleCastError(err);

//   // Field validation error:
//   if (err.name === "ValidationError") prodError = handleValidationError(err);

//   // Json Web Token Error:
//   if (err.name === "JsonWebTokenError") prodError = handleJWTError();
//   if (err.name === "TokenExpiredError") prodError = handleJWTErrorExpiers();

//   // Duplicate input error:
//   if (err.code === 11000) prodError = handleUniqueError(err);

//   // Return error:
//   sendErrorProd(prodError, res);
// }
