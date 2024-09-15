//import asyncHandler from "express-async-handler";
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js'; // Adjust the path as necessary

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

export const createOrder = expressAsyncHandler(async (req, res, next) => {
  try {
    const { products } = req.body; // Extract products from the request body

    if (!products || products.length === 0) {
      return next(new AppError(400, 'Products are required for creating an order'));
    }

    // Debugging: Log the products to see the value
    console.dir(products, { depth: null });

    // Create the order
    const order = await Order.create(req.body);

    // Update the sold count for the products
    //await updateSoldCount(products);

    res.status(201).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (err) {
    console.error('Error creating order:', err);
    next(err);
  }
});

export const validateAndUpdateStock = async (req, res, next) => {
  try {
    for (const item of req.body.products) {
      const productColor = await ProductColor.findById(item.productColor);

      if (!productColor) {
        return next(
          new AppError(404, `ProductColor with ID ${item.productColor} not found`)
        );
      }

      // Convert sizes object to Map if it isn't already
      if (!(productColor.sizes instanceof Map)) {
        productColor.sizes = new Map(Object.entries(productColor.sizes));
      }

      let sizesMap;
      if (Array.isArray(item.sizes)) {
        sizesMap = new Map(item.sizes);
      } else if (item.sizes instanceof Map) {
        sizesMap = item.sizes;
      } else {
        // Convert sizes object to Map if it isn't already
        sizesMap = new Map(Object.entries(item.sizes));
      }

      // Validate sizes and quantities
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
              `Size ${size} not found in ProductColor ID ${item.productColor}`
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

    // Update stock quantities
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
      } else {
        sizesMap = new Map(Object.entries(item.sizes));
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
