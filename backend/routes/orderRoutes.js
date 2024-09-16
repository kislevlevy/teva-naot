import express from 'express';
import {
  createOrder,
  getOrders,
  changeOrderStatusById,
  validateOrder,
} from '../controllers/orderController.js';
import { protect } from '../controllers/authController.js';

// Initiation for router:
const router = express.Router({ mergeParams: true });

router.use(protect);

// Route to change the status of an order by its ID
router.patch('/:id/changeStatus', changeOrderStatusById);

// Route to get all orders and create a new order
router
  .route('/')
  .get(getOrders) // GET request to retrieve orders
  .post(validateOrder, createOrder); // POST request with middleware and route handler

export default router;
