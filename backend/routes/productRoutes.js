// Imports:
import express from 'express';

import {
  createProduct,
  createProductGroup,
  deleteProductById,
  deleteProductGroupById,
  deleteProductGroupItems,
  editProductById,
  editProductGroupById,
  editProductStockById,
  getProductById,
  getProductGroupById,
  getProducts,
  getProductsGroups,
} from '../controllers/productController.js';
import { getProductsStockStats } from '../controllers/statsController.js';

// Initiation for router:
const router = express.Router({ mergeParams: true });

// Stock:
router.patch('/:id/stock', editProductStockById);
// router.route('/stats').get('/stock', getProductsStockStats);

// Product Groups:
router
  .route('/group/:id')
  .get(getProductGroupById)
  .patch(editProductGroupById)
  .delete(deleteProductGroupItems, deleteProductGroupById);
router.route('/group').get(getProductsGroups).post(createProductGroup);

// Products:
router
  .route('/:id')
  .get(getProductById)
  .delete(deleteProductById)
  .patch(editProductById);
router.route('/').get(getProducts).post(createProduct);

// Export module:
export default router;
