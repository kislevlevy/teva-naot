export default (err, req, res, next) => {
  console.log(err);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
