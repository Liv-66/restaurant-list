const AppError = require('../config/appError');

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.properties.message);
  const message = `Invalid input data. ${errors.join('. ')}.`;
  return new AppError(message, 400);
};

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  }
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Something went wrong, please try again.',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  // let error = { ...err };
  if (err.name === 'ValidationError') {
    Object.values(err.errors).map((el) => {
      req.flash('warning_msg', el.message);
    });
  }
  next();
  //   error = handleValidationErrorDB(error);
  //   sendErrorProd(error, req, res);
};
