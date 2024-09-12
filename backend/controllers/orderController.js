//import asyncHandler from "express-async-handler";
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import AppError from '../utils/appError.js';
import {
  editOneById,
  getMany,
  getOneById,
  createOne,
  oneDocApiResponse,
} from '../utils/handlerFactory.js';

//export const createOrder = createOne(Order);
export const getOrders = getMany(Order);
export const getOrderById = getOneById(Order);
export const editOrderById = editOneById(Order);

export const changeOrderStatusById = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !id) {
    return next(new AppError(400, 'ID and status are required'));
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );

  if (!updatedOrder) {
    return next(new AppError(404, 'Order not found'));
  }

  oneDocApiResponse(res, 200, { doc: updatedOrder });
});

export const createOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const validateAndUpdateStock = async (req, res, next) => {
  try {
    for (const item of req.body.products) {
      const product = await Product.findById(item.product);

      if (!product) {
        return next(new AppError(404, `Product with ID ${item.product} not found`));
      }

      if (!(product.sizes instanceof Map)) {
        product.sizes = new Map(Object.entries(product.sizes));
      }

      let sizesMap;
      if (Array.isArray(item.sizes)) {
        sizesMap = new Map(item.sizes);
      } else if (item.sizes instanceof Map) {
        sizesMap = item.sizes;
      } else {
        return next(new AppError(400, 'Invalid sizes format'));
      }

      for (const [size, quantity] of sizesMap) {
        if (quantity <= 0) {
          return next(
            new AppError(400, `Quantity for size ${size} must be greater than 0`)
          );
        }

        if (!product.sizes.has(size)) {
          return next(
            new AppError(404, `Size ${size} not found in Product ID ${item.product}`)
          );
        }

        if (product.sizes.get(size) < quantity) {
          return next(
            new AppError(400, `Product does not have enough stock for size ${size}`)
          );
        }
      }
    }

    for (const item of req.body.products) {
      const product = await Product.findById(item.product);

      if (!(product.sizes instanceof Map)) {
        product.sizes = new Map(Object.entries(product.sizes));
      }

      let sizesMap;
      if (Array.isArray(item.sizes)) {
        sizesMap = new Map(item.sizes);
      } else if (item.sizes instanceof Map) {
        sizesMap = item.sizes;
      }

      for (const [size, quantity] of sizesMap) {
        product.sizes.set(size, product.sizes.get(size) - quantity);
      }

      await product.save();
    }

    next();
  } catch (err) {
    return next(
      new AppError(500, 'Server error while validating and updating stock')
    );
  }
};
