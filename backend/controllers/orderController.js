//import asyncHandler from "express-async-handler";
import Order from "../models/orderModel";
import AppError from "../utils/appError";
import {
  editOneById,
  getMany,
  getOneById,
  createOne,
  oneDocApiReponse,
} from "../utils/handlerFactory";

export const createOrder = createOne(Order);
export const getOrders = getMany(Order);
export const getOrderById = getOneById(Order);
export const editOrderById = editOneById(Order);

export const changeOrderStatus = (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !id) {
    return next(new AppError(404, "ID and status are required"));
  }

  const updatedOrder = Order.findByIdAndUpdate(id, { status });
  if (!updatedOrder) {
    return next(new AppError(404, "Order not found"));
  }

  oneDocApiReponse(res, 200, { doc: updatedOrder });
};
