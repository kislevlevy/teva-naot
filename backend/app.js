// Module imports:
import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import path from 'path';

import AppError from './utils/appError.js';

////////////////////////////////////////////////
// App init:
const app = express();

// Static public folder:
app.use(express.static('public'));

////////////////////////////////////////////////
// Middlewares:
app.use(helmet()); // HTTP secure setup:

// Dev logging:
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Limit api req from one client:
const limiter = rateLimit({
  max: 100,
  windowMs: 3600000,
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api', limiter);

// body parcer:
app.use(express.json({ limit: '10kb' }));

// Data sanitization:
app.use(mongoSanitize()); // noSQL injection protection
app.use(xss()); // html/script injection protection
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
); // dup parmater protection

////////////////////////////////////////////////
// App router:

// Error handeling:
app.all('*', (req, res, next) => {
  next(
    new AppError(
      `Cannot find desired request on this server. (${req.originalUrl})`,
      404
    )
  );
});

////////////////////////////////////////////////
// Export module:
export default app;
