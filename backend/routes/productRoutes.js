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
  getProductColorById,
  getProductColors,
  getProducts,
} from '../controllers/productController.js';
import { protect } from '../controllers/authController.js';
// import { getProductsStockStats } from '../controllers/statsController.js';

// Initiation for router:
const router = express.Router({ mergeParams: true });

// Stock:
router.patch('/:id/stock', editProductStockById);
// router.route('/stats').get('/stock', getProductsStockStats);

// Product colors:
router.route('/colors').get(getProductColors).post(protect, createProductColor);
router
  .route('/colors/:id')
  .get(getProductColorById)
  .delete(protect, deleteProductColorById)
  .patch(protect, editProductColorById);

// Product:
router.route('/').get(getProducts).post(protect, createProduct);
router
  .route('/:id')
  .get(getProductById)
  .patch(protect, editProductById)
  .delete(deleteProductById);

// Export module:
export default router;
