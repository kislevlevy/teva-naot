// Imports:
import asyncHandler from 'express-async-handler';

import Product from '../models/productModel.js';
import ProductColor from '../models/productColorModel.js';
import {
  createOne,
  deleteOneById,
  editOneById,
  getMany,
  getOneById,
  oneDocApiResponse,
  validIdCheck,
} from '../utils/handlerFactory.js';
import AppError from '../utils/appError.js';

// Methodes:
// Product -main product:
export const getProducts = getMany(Product);
export const createProduct = createOne(Product);

export const getProductById = getOneById(Product);
export const editProductById = editOneById(Product);
export const deleteProductById = deleteOneById(Product);

export const deleteProductItems = asyncHandler(async (req, res, next) => {
  const { products } = await Product.findById(req.params.id);

  for (let i = 0; i < products.length; i++)
    await ProductColor.findByIdAndDelete(products[i]);

  next();
});

// Product -color variation:
export const getProductColors = getMany(ProductColor);
export const createProductColor = createOne(ProductColor);

export const getProductColorById = getOneById(ProductColor);
export const editProductColorById = editOneById(ProductColor);
export const deleteProductColorById = deleteOneById(ProductColor);

export const editProductStockById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { sizes } = req.body;

  if ((!id, !sizes))
    return next(
      new AppError(404, 'Request must include product ID, and sizes object.')
    );

  // Chack for valid ID:
  const { outputId, errorId } = validIdCheck(id);
  if (!outputId) return next(errorId);

  // Find product by ID:
  const product = await ProductColor.findById(id);
  if (!product) return next(new AppError(404, 'Cannot find product by ID.'));

  Object.entries(sizes).map(([size, stock]) => product.sizes.set(size, stock));

  const updatedProduct = await product.save({
    validateBeforeSave: true,
  });

  // updatedProduct
  oneDocApiResponse(res, 200, { doc: updatedProduct });
});
