//import asyncHandler from "express-async-handler";
import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import ProductColor from '../models/productColorModel.js';
import AppError from '../utils/appError.js';
import {
  editOneById,
  getMany,
  getOneById,
  oneDocApiResponse,
} from '../utils/handlerFactory.js';
import { createPaypalOrder } from '../utils/paypal.js';

export const getOrders = getMany(Order);
export const getOrderById = getOneById(Order);
export const editOrderById = editOneById(Order);

export const changeOrderStatusById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !id) return next(new AppError(400, 'ID and status are required'));

  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );

  if (!updatedOrder) return next(new AppError(404, 'Order not found'));

  oneDocApiResponse(res, 200, { doc: updatedOrder });
});

export const createOrder = asyncHandler(async (req, res, next) => {
  const { products, shippingAddress, total } = req.body;

  const order = await Order.create({
    products,
    shippingAddress,
    total,
    user: req.user._id,
  });
  await order.populate({ path: 'user', select: 'email phoneNumber fullName' });

  const url = await createPaypalOrder(order);
  res.status(200).json({
    status: 'success',
    data: {
      url,
    },
  });
});

export const validateOrder = asyncHandler(async (req, res, next) => {
  const { products, shippingAddress } = req.body;
  if (!products || !shippingAddress)
    return next(new AppError(404, 'order is missing fields'));

  for (const [i, product] of products.entries()) {
    const productColor = await ProductColor.findById(product.productColor);
    if (!productColor)
      return next(
        new AppError(404, `ProductColor with ID ${item.productColor} not found`)
      );

    const isInStock = Object.entries(product.sizes).every(([key, value]) => {
      const dbValue = productColor.sizes.get(key);

      if (!dbValue || dbValue < value || value < 1) return false;

      productColor.sizes.set(key, dbValue - value);
      if (!req.body.total) req.body.total = 0;
      req.body.total += productColor.price * value;
      req.body.products[i].price = productColor.price;

      return true;
    });

    if (!isInStock)
      return next(
        new AppError(404, `${productColor.name} in specified size is not in stock`)
      );

    await productColor.save();
  }

  next();
});
