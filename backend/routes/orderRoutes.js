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

// Route to change the status of an order by its ID
router.patch('/:id/changeStatus', changeOrderStatusById);

// Route to get all orders and create a new order
router
  .route('/')
  .get(getOrders) // GET request to retrieve orders
  .post(validateAndUpdateStock, createOrder); // POST request with middleware and route handler

export default router;
