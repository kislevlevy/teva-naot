// Imports:
import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// Methodes:
const calculatePeriodRange = (currentDate, type) => {
  const endOfCurrentPeriod = new Date(currentDate);
  const startOfPreviousPeriod = new Date(endOfCurrentPeriod);
  const startOfCurrentPeriod = new Date(endOfCurrentPeriod);

  if (type === 'day') {
    startOfCurrentPeriod.setDate(endOfCurrentPeriod.getDate() - 1);
    startOfPreviousPeriod.setDate(endOfCurrentPeriod.getDate() - 2);
  }
  if (type === 'week') {
    startOfCurrentPeriod.setDate(endOfCurrentPeriod.getDate() - 7);
    startOfPreviousPeriod.setDate(endOfCurrentPeriod.getDate() - 14);
  }
  if (type === 'month') {
    startOfCurrentPeriod.setMonth(endOfCurrentPeriod.getMonth() - 1);
    startOfPreviousPeriod.setMonth(endOfCurrentPeriod.getMonth() - 2);
  }

  return {
    startOfCurrentPeriod,
    endOfCurrentPeriod,
    startOfPreviousPeriod,
  };
};

export const getProfits = asyncHandler(async (req, res, next) => {
  const currentDate = new Date();

  const dayRange = calculatePeriodRange(currentDate, 'day');
  const weekRange = calculatePeriodRange(currentDate, 'week');
  const monthRange = calculatePeriodRange(currentDate, 'month');

  const orders = await Order.find({
    orderDate: { $gte: monthRange.startOfPreviousPeriod },
  }).select('total orderDate');

  const profitData = {
    day: [0, 0],
    week: [0, 0],
    month: [0, 0],
  };

  orders.forEach((order) => {
    const orderDate = new Date(order.orderDate);
    const total = order.total;

    if (
      orderDate >= dayRange.startOfCurrentPeriod &&
      orderDate <= dayRange.endOfCurrentPeriod
    ) {
      profitData.day[0] += total;
    } else if (
      orderDate >= dayRange.startOfPreviousPeriod &&
      orderDate < dayRange.startOfCurrentPeriod
    ) {
      profitData.day[1] += total;
    }

    if (
      orderDate >= weekRange.startOfCurrentPeriod &&
      orderDate <= weekRange.endOfCurrentPeriod
    ) {
      profitData.week[0] += total;
    } else if (
      orderDate >= weekRange.startOfPreviousPeriod &&
      orderDate < weekRange.startOfCurrentPeriod
    ) {
      profitData.week[1] += total;
    }

    if (
      orderDate >= monthRange.startOfCurrentPeriod &&
      orderDate <= monthRange.endOfCurrentPeriod
    ) {
      profitData.month[0] += total;
    } else if (
      orderDate >= monthRange.startOfPreviousPeriod &&
      orderDate < monthRange.startOfCurrentPeriod
    ) {
      profitData.month[1] += total;
    }
  });

  res.status(200).json({
    status: 'success',
    data: {
      profitData: {
        day: profitData.day,
        week: profitData.week,
        month: profitData.month,
      },
    },
  });
});

export const getOrdersLeftToFulfill = asyncHandler(async (req, res, next) => {
  const ordersLeft = await Order.aggregate([
    {
      $match: { status: { $in: ['pending', 'processing', 'shipped'] } },
    },
    { $count: 'ordersLeftToFulfill' },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      ordersLeftToFulfill:
        ordersLeft.length > 0 ? ordersLeft[0].ordersLeftToFulfill : 0,
    },
  });
});
