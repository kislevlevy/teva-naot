//import asyncHandler from "express-async-handler";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import AppError from "../utils/appError.js";
import {
  editOneById,
  getMany,
  getOneById,
  createOne,
  oneDocApiReponse,
} from "../utils/handlerFactory.js";

export const createOrder = createOne(Order);
export const getOrders = getMany(Order);
export const getOrderById = getOneById(Order);
export const editOrderById = editOneById(Order);

export const changeOrderStatus = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !id) {
    return next(new AppError(400, "ID and status are required"));
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );

  if (!updatedOrder) {
    return next(new AppError(404, "Order not found"));
  }

  oneDocApiReponse(res, 200, { doc: updatedOrder });
});
