// Imports:
import asyncHandler from 'express-async-handler';

import AppError from './appError.js';
import ApiFeatures from './apiFeatures.js';
import mongoose from 'mongoose';

// Helper functions:
export const oneDocApiReponse = (res, statusCode, data) =>
  res.status(statusCode).json({
    status: 'success',
    data,
  });
export const manyDocsApiReponse = (res, statusCode, data) =>
  res.status(statusCode).json({
    status: 'success',
    results: data.docs.length,
    data,
  });
export const reqBodyCheck = (body) => ({
  outputBody: Object.keys(body).length < 1,
  errorBody: new AppError(404, 'Request must include a body'),
});
export const validIdCheck = (id) => ({
  outputId: mongoose.Types.ObjectId.isValid(id),
  errorId: new AppError(400, 'Provided ID is not valid'),
});

// Functions:
export const getMany = (Model) =>
  asyncHandler(async (req, res, next) => {
    // Execute query:
    const features = new ApiFeatures(req, Model.find());
    features.filter().sort().fields().pagination();

    // Awaiting for docs array:
    const docs = await features.find;

    if (!docs || docs.length < 1)
      return next(new AppError(404, 'No documents exiest for your query in DB'));

    // API response:
    manyDocsApiReponse(res, 200, { docs });
  });

export const getOneById = (Model) =>
  asyncHandler(async (req, res, next) => {
    // Gurd for currect ID:
    const { id } = req.params;
    const { outputId, errorId } = validIdCheck(id);
    if (!outputId) return next(errorId);

    // Find doc by ID:
    const doc = await Model.findById(id);

    // Guard:
    if (!doc) return next(new AppError(404, 'No document found with that ID.'));

    // API response:
    oneDocApiReponse(res, 200, { doc });
  });

export const editOneById = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { body } = req;
    const { id } = req.params;

    // Gurd for currect ID:
    const { outputId, errorId } = validIdCheck(id);
    if (!outputId) return next(errorId);
    // Gaurd for body in request:
    const { outputBody, errorBody } = reqBodyCheck(body);
    if (!errorBody) return next(outputBody);

    // Find doc by id & update:
    const updatedDoc = await Model.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    // API response:
    oneDocApiReponse(res, 200, { doc: updatedDoc });
  });

export const createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { body } = req;

    // Gaurd for body in request:
    const { outputBody, errorBody } = reqBodyCheck(body);
    if (!errorBody) return next(outputBody);

    // Create new document:
    const newDoc = await Model.create(body);

    // API response:
    oneDocApiReponse(res, 201, { doc: newDoc });
  });

export const deleteOneById = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    // Gurd for currect ID:
    const { outputId, errorId } = validIdCheck(id);
    if (!outputId) return next(errorId);

    // find doc and delete by ID:
    await Model.findByIdAndDelete(id);

    // API response:
    oneDocApiReponse(res, 204, { doc: null });
  });
