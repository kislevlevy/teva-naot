import express from "express";
import changeOrderStatus from "../controllers/orderController";

router.patch("/order/:id/status", changeOrderStatus);

module.exports = router;
