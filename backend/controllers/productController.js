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
  oneDocApiReponse,
} from '../utils/handlerFactory.js';
import AppError from '../utils/appError.js';

// Methodes:
// Product:
export const getProducts = getMany(Product);
export const createProduct = createOne(Product);

export const getProductById = getOneById(Product);
export const editProductById = editOneById(Product);
export const deleteProductById = deleteOneById(Product);

export const editProductStockById = (req, res, next) => {
  const { id, size, newStock } = req.body;
  if ((!id, !size, !newStock))
    return next(new AppError(404, 'All fields are mandetory'));

  const { sizes } = Product.findById(id);
  if (!sizes) return next(new AppError(404, 'Cannot find product by ID.'));
  const newSizes = sizes.map((ele) => ele[0] === size && (ele[1] = newStock));

  const updatedProduct = Product.findByIdAndUpdate(id, { sizes: newSizes });
  oneDocApiReponse(res, 200, { doc: updatedProduct });
};

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
