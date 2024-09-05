import express from 'express';
import { changeOrderStatus } from '../controllers/orderController.js';

// Initiation for router:
const router = express.Router({ mergeParams: true });

router.patch('/order/:id/status', changeOrderStatus);

export default router;
