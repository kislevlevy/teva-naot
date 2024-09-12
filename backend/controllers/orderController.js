//import asyncHandler from "express-async-handler";
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import ProductColor from '../models/productColorModel.js';
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
      const productColor = await ProductColor.findById(item.productColor);

      if (!productColor) {
        return next(
          new AppError(404, `productColor with ID ${item.productColor} not found`)
        );
      }

      if (!(productColor.sizes instanceof Map)) {
        productColor.sizes = new Map(Object.entries(productColor.sizes));
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

        if (!productColor.sizes.has(size)) {
          return next(
            new AppError(
              404,
              `Size ${size} not found in Product ID ${item.productColor}`
            )
          );
        }

        if (productColor.sizes.get(size) < quantity) {
          return next(
            new AppError(400, `Product does not have enough stock for size ${size}`)
          );
        }
      }
    }

    for (const item of req.body.products) {
      const productColor = await ProductColor.findById(item.productColor);

      if (!(productColor.sizes instanceof Map)) {
        productColor.sizes = new Map(Object.entries(productColor.sizes));
      }

      let sizesMap;
      if (Array.isArray(item.sizes)) {
        sizesMap = new Map(item.sizes);
      } else if (item.sizes instanceof Map) {
        sizesMap = item.sizes;
      }

      for (const [size, quantity] of sizesMap) {
        productColor.sizes.set(size, productColor.sizes.get(size) - quantity);
      }

      await productColor.save();
    }

    next();
  } catch (err) {
    return next(
      new AppError(500, 'Server error while validating and updating stock')
    );
  }
};
