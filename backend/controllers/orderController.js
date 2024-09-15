//import asyncHandler from "express-async-handler";
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
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
    await updateSoldCount(products);

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

      console.log('Before stock update:', productColor.sizes);

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

        productColor.sizes.set(size, productColor.sizes.get(size) - quantity);
      }

      console.log('After stock update:', productColor.sizes);
      await productColor.save();
    }

    next();
  } catch (err) {
    return next(
      new AppError(500, 'Server error while validating and updating stock')
    );
  }
};

const updateSoldCount = async (products) => {
  try {
    for (const item of products) {
      const { productColor, sizes } = item;

      if (!productColor || !sizes) {
        console.error('Missing productColor or sizes in the product item');
        continue;
      }

      const productColorDoc = await ProductColor.findById(productColor).populate(
        'product'
      );

      if (!productColorDoc) {
        console.error(`ProductColor with ID ${productColor} not found`);
        continue;
      }

      const product = productColorDoc.product;
      if (!product) {
        console.error(`Product not found for ProductColor with ID ${productColor}`);
        continue;
      }

      let sizesMap;
      if (Array.isArray(sizes)) {
        sizesMap = new Map(sizes);
      } else if (sizes instanceof Map) {
        sizesMap = sizes;
      } else {
        sizesMap = new Map(Object.entries(sizes));
      }

      // Calculate total sold quantity from sizes
      const totalSold = Array.from(sizesMap.values()).reduce(
        (acc, quantity) => acc + quantity,
        0
      );

      if (totalSold <= 0) {
        console.error('Total sold quantity must be greater than 0');
        continue; // Skip this product
      }

      // Increment the sold count in the Product
      product.sold = (product.sold || 0) + totalSold;

      // Save the updated Product
      await product.save();
    }
  } catch (err) {
    console.error('Error updating sold count:', err);
    throw new Error('Error updating sold count');
  }
};
