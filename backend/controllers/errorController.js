export default (err, req, res, next) => {
  const { status = 'fail', statusCode = 500, message = '' } = err;
  console.log(err);

  res.status(statusCode).json({
    status: status,
    message: message,
  });
};
