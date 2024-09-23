// statsRoutes.js
import express from 'express';
import {
  getProfits,
  getOrdersLeftToFulfill,
} from '../controllers/statsController.js';

const router = express.Router();

router.get('/profits', getProfits);
router.get('/orders-left', getOrdersLeftToFulfill);

export default router;
