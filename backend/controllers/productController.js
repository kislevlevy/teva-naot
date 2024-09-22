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

export const getProductByIdWithSizes = asyncHandler(async (req, res, next) => {
  // Guard for correct ID:
  const { id } = req.params;
  const { outputId, errorId } = validIdCheck(id);
  if (!outputId) return next(errorId);

  // Find doc by ID
  const doc = await Product.findById(id).lean();

  // Guard:
  if (!doc) return next(new AppError(404, 'No Product found with that ID.'));

  // Populate the product colors with sizes
  const docWithSizes = await Product.populate(doc, {
    path: 'colors',
    select: 'sizes',
  });

  // API response
  oneDocApiResponse(res, 200, { doc: docWithSizes });
});

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

export const prepareCreateOrPatchProductColor = (req, res, next) => {
  const { sizes, thumbnail } = req.body;
  sizes && (req.body.sizes = new Map(JSON.parse(sizes)));
  thumbnail && (req.body.thumbnail = JSON.parse(thumbnail));
  next();
};

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

// export const getProductsForUser = async (req, res, next) => {
//   try {
//     const user = req.user;

//     if (!user || !user.favoriteCategories || user.favoriteCategories.length === 0) {
//       return res.status(400).json({
//         status: 'fail',
//         message: 'No favorite categories found for the user',
//       });
//     }

//     const favoriteCategories = user.favoriteCategories.map((cat) => cat.category);

//     // Fetch products from favorite categories
//     const favoriteCategoryProducts = await Product.aggregate([
//       { $match: { category: { $in: favoriteCategories }, sold: { $gt: 0 } } },
//       { $sample: { size: 5 } },
//     ]);

//     const topSoldProducts = await Product.aggregate([
//       { $match: { sold: { $gt: 0 } } },
//       { $sort: { sold: -1 } }, // Sort by the 'sold' field in descending order
//       { $limit: 5 },
//     ]);

//     const combinedProducts = [...favoriteCategoryProducts, ...topSoldProducts];
//     const uniqueProducts = Array.from(
//       new Map(
//         combinedProducts.map((product) => [product._id.toString(), product])
//       ).values()
//     );

//     res.status(200).json({
//       status: 'success',
//       data: {
//         products: uniqueProducts,
//       },
//     });
//   } catch (err) {
//     console.error('Error fetching products for user:', err);
//     next(err);
//   }
// };

export const getProductsForUser = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user || !user.favoriteCategories || user.favoriteCategories.length === 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'No favorite categories found for the user',
      });
    }

    const favoriteCategories = user.favoriteCategories.map((cat) => cat.category);

    // Fetch products from favorite categories
    const favoriteCategoryProducts = await Product.aggregate([
      {
        $match: {
          category: { $in: favoriteCategories },
          sold: { $gt: 0 },
        },
      },
      { $sample: { size: 5 } },
    ]);

    // Fetch top 5 sold products
    const topSoldProducts = await Product.aggregate([
      { $match: { sold: { $gt: 0 } } },
      { $sort: { sold: -1 } },
      { $limit: 5 },
    ]);

    // Fetch 5 discounted product colors
    const discountedProductColors = await ProductColor.aggregate([
      {
        $match: {
          priceBeforeDiscount: { $exists: true, $gt: 0 },
          $expr: { $gt: ['$priceBeforeDiscount', '$price'] },
        },
      },
      { $sample: { size: 5 } },
    ]);

    // Combine all results and ensure unique products
    const combinedProducts = [
      ...favoriteCategoryProducts,
      ...topSoldProducts,
      ...discountedProductColors,
    ];

    // Ensure products are unique based on _id
    const uniqueProducts = Array.from(
      new Map(
        combinedProducts.map((product) => [product._id.toString(), product])
      ).values()
    );

    res.status(200).json({
      status: 'success',
      data: {
        products: uniqueProducts,
      },
    });
  } catch (err) {
    console.error('Error fetching products for user:', err);
    next(err);
  }
};
