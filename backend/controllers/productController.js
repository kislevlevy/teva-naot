// Imports:
import asyncHandler from 'express-async-handler';

import ProductGroup from '../models/productGroupModel.js';
import Product from '../models/productModel.js';
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
// Product:
export const getProducts = getMany(Product);
export const createProduct = createOne(Product);

export const getProductById = getOneById(Product);
export const editProductById = editOneById(Product);
export const deleteProductById = deleteOneById(Product);

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
  const product = await Product.findById(id);
  if (!product) return next(new AppError(404, 'Cannot find product by ID.'));

  Object.entries(sizes).map(([size, stock]) => product.sizes.set(size, stock));

  const updatedProduct = await product.save({
    validateBeforeSave: true,
  });

  // updatedProduct
  oneDocApiResponse(res, 200, { doc: updatedProduct });
});

// Product Group:
export const getProductsGroups = getMany(ProductGroup);
export const createProductGroup = createOne(ProductGroup);

export const getProductGroupById = getOneById(ProductGroup);
export const editProductGroupById = editOneById(ProductGroup);
export const deleteProductGroupById = deleteOneById(ProductGroup);

export const deleteProductGroupItems = asyncHandler(async (req, res, next) => {
  const { products } = await ProductGroup.findById(req.params.id);

  for (let i = 0; i < products.length; i++)
    await Product.findByIdAndDelete(products[i]);

  next();
});
