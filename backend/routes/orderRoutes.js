import express from "express";
import {
  changeOrderStatus,
  createOrder,
  getOrders,
  getOrderById,
  editOrderById,
} from "../controllers/orderController.js";

// Initiation for router:
const router = express.Router({ mergeParams: true });

router.patch("/:id/status", changeOrderStatus);
router.post("/createOrder", createOrder);
router.get("/getOrder", getOrders);
router.get("/:id/getOrderById", getOrderById);
router.patch("/:id/editOrderById", editOrderById);

export default router;
