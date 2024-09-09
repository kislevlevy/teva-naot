// Module imports:
import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import path from 'path';
import cookieParser from 'cookie-parser';

import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
// import statsRouter from "./routes/statsRoutes";

import AppError from './utils/appError.js';
import errorController from './controllers/errorController.js';

////////////////////////////////////////////////
// App init:
const app = express();

// Cors config:
const corsWhiteList = [
  'http://localhost:5173',
  'http://localhost:5173/',
  process.env.FRONT_END,
  process.env.FRONT_END + '/',
];
const corsConfig = {
  origin: (origin, callback) => {
    if (!origin || corsWhiteList.includes(origin)) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

// Static public folder:
app.use(express.static('public'));
app.use(cors(corsConfig));

////////////////////////////////////////////////
// Middlewares:
app.use(cookieParser()); // cookieParser
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
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/reviews', reviewRouter);
// app.use("/api/v1/stats", statsRouter);
// app.use("/api/v1/stats", statsRouter);

// Error handeling:
app.all('*', (req, res, next) => {
  next(
    new AppError(
      404,
      `Cannot find desired request on this server. (${req.originalUrl})`
    )
  );
});

app.use(errorController);

////////////////////////////////////////////////
// Export module:
export default app;
