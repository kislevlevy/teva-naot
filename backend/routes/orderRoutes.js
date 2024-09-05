import express from "express";
import {
  changeOrderStatus,
  createOrder,
} from "../controllers/orderController.js";

// Initiation for router:
const router = express.Router({ mergeParams: true });

router.patch("/:id/status", changeOrderStatus);
router.post("/create", createOrder);

export default router;
