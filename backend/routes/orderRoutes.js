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
import { cancelOrder, capturePaypalPayment } from '../utils/paypal.js';

// Initiation for router:
const router = express.Router({ mergeParams: true });

router.post('/success', capturePaypalPayment);
router.post('/failure', cancelOrder);

router.use(protect);
router.patch(
  '/:id/changeStatus',
  restrictByRole('employee', 'admin'),
  restrictByPermission('shipping'),
  changeOrderStatusById
);
router
  .route('/')
  .get(
    restrictByRole('employee', 'admin'),
    restrictByPermission('shipping'),
    getOrders
  )
  .post(validateOrder, createOrder);

export default router;
