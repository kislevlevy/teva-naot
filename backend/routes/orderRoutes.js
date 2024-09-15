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

router.route('/').get(getOrders).post(validateAndUpdateStock, createOrder);

export default router;
