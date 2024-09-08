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
  oneDocApiReponse,
} from '../utils/handlerFactory.js';

export const createOrder = createOne(Order);
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

  oneDocApiReponse(res, 200, { doc: updatedOrder });
});

export const validateAndUpdateStock = expressAsyncHandler(async (req, res, next) => {
  const { products } = req.body;

  for (const item of products) {
    const product = await Product.findById(item.product);

    if (!product) {
      return next(
        new AppError(404, `Product with ID ${item.product} does not exist`)
      );
    }

    const productSizes = product.sizes;

    for (const [size, quantity] of item.sizes) {
      const productSize = productSizes.find(([prodSize]) => prodSize === size);

      if (!productSize) {
        return next(
          new AppError(
            400,
            `Size ${size} is not available for product with ID ${item.product}`
          )
        );
      }

      const availableStock = productSize[1];
      if (availableStock < quantity) {
        return next(
          new AppError(
            400,
            `Not enough stock for size ${size} of product with ID ${item.product}`
          )
        );
      }
    }

    for (const [size, quantity] of item.sizes) {
      const sizeIndex = productSizes.findIndex(([prodSize]) => prodSize === size);
      if (sizeIndex !== -1) {
        productSizes[sizeIndex][1] -= quantity;
      }
    }

    await product.save();
  }

  next();
});
