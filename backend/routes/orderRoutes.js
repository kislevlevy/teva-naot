import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  editOrderById,
  changeOrderStatusById,
  validateAndUpdateStock,
} from '../controllers/orderController.js';

// Initiation for router:
const router = express.Router({ mergeParams: true });

router.patch('/:id/changeStatus', changeOrderStatusById);

//router.route('/').post(createOrder).get(getOrders);
router
  .route('/')
  .post(validateAndUpdateStock, createOrder) // Middleware and route handler
  .get(getOrders);

router.route('/:id').get(getOrderById).patch(editOrderById);

export default router;
