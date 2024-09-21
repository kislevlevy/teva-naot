import express from 'express';
import {
  createOrder,
  getOrders,
  changeOrderStatusById,
  validateOrder,
} from '../controllers/orderController.js';
import {
  protect,
  restrictByPermission,
  restrictByRole,
} from '../controllers/authController.js';

// Initiation for router:
const router = express.Router({ mergeParams: true });

router.use(protect);
router.patch(
  '/:id/changeStatus',
  restrictByRole('employee', 'admin'),
  restrictByPermission('shipping'),
  changeOrderStatusById
);
router.route('/').get(getOrders).post(validateOrder, createOrder);

export default router;
