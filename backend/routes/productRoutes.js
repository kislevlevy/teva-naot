// Imports:
import express from 'express';

import {
  createProduct,
  createProductColor,
  deleteProductById,
  deleteProductColorById,
  editProductById,
  editProductColorById,
  editProductStockById,
  getProductById,
  getProductByIdWithSizes,
  getProductColorById,
  getProductColors,
  getProducts,
  getProductsForUser,
  prepareCreateOrPatchProductColor,
} from '../controllers/productController.js';
import {
  protect,
  restrictByPermission,
  restrictByRole,
} from '../controllers/authController.js';
import {
  upload,
  uploadProductColorImages,
  uploadProductImage,
} from '../utils/storage.js';
import { simpleResponse } from '../utils/handlerFactory.js';

// Initiation for router:
const router = express.Router({ mergeParams: true });

// Product colors:
router
  .route('/colors')
  .get(getProductColors)
  .post(
    upload.fields([
      { name: 'images', maxCount: 10 },
      { name: 'thumbnail', maxCount: 1 },
    ]),
    protect,
    restrictByRole('employee', 'admin'),
    restrictByPermission('product'),
    prepareCreateOrPatchProductColor,
    createProductColor,
    uploadProductColorImages,
    simpleResponse
  );
router.patch('/colors/:id/stock', editProductStockById);
router
  .route('/colors/:id')
  .get(getProductColorById)
  .delete(
    protect,
    restrictByRole('employee', 'admin'),
    restrictByPermission('product'),
    deleteProductColorById
  )
  .patch(
    upload.fields([
      { name: 'images', maxCount: 10 },
      { name: 'thumbnail', maxCount: 1 },
    ]),
    protect,
    restrictByRole('employee', 'admin'),
    restrictByPermission('product'),
    prepareCreateOrPatchProductColor,
    editProductColorById,
    uploadProductColorImages,
    simpleResponse
  );

// Product:
router
  .route('/')
  .get(getProducts)
  .post(
    upload.single('image'),
    protect,
    restrictByRole('employee', 'admin'),
    restrictByPermission('product'),
    createProduct,
    uploadProductImage,
    simpleResponse
  );

router.route('/foru').get(protect, getProductsForUser);

router
  .route('/full-info/:id') //maybe choose "with-sizes" or "details"
  .get(
    protect,
    restrictByRole('employee', 'admin'),
    restrictByPermission('product'),
    getProductByIdWithSizes
  );

router
  .route('/:id')
  .get(getProductById)
  .patch(
    upload.single('image'),
    protect,
    restrictByRole('employee', 'admin'),
    restrictByPermission('product'),
    editProductById,
    uploadProductImage,
    simpleResponse
  )

  .delete(
    protect,
    restrictByRole('employee', 'admin'),
    restrictByPermission('product'),
    deleteProductById
  );

// Export module:
export default router;
