// Imports:
import asyncHandler from 'express-async-handler';

import AppError from './appError';
import ApiFeatures from './apiFeatures';

// Helper functions:
export const oneDocApiReponse = (res, statusCode, data) =>
  res.status(statusCode).json({
    status: 'success',
    data,
  });
export const manyDocsApiReponse = (res, statusCode, data) =>
  res.status(statusCode).json({
    status: 'success',
    results: data.length,
    data,
  });

// Functions:
export const getMany = (Model) =>
  asyncHandler(async (req, res, next) => {
    // Execute query:
    const features = new ApiFeatures(req, Model.find());
    features.filter().sort().fields().pagination();

    // Awaiting for docs array:
    const docs = await features.find;

    // API response:
    manyDocsApiReponse(res, 200, { docs });
  });

export const getOneById = (Model) =>
  asyncHandler(async (req, res, next) => {
    // Find doc by ID:
    const doc = await Model.findById(req.params.id);

    // Guard:
    if (!doc) return next(new AppError(404, 'No document found with that ID.'));

    // API response:
    oneDocApiReponse(res, 200, { doc });
  });

export const editOneById = (Model) =>
  asyncHandler(async (req, res, next) => {
    // Find doc by id & update:
    const updatedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // Guard:
    if (!updatedDoc)
      return next(new AppError('No document found with that ID.', 404));

    // API response:
    oneDocApiReponse(res, 200, { doc: updatedDoc });
  });

export const createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    // Create new document:
    const newDoc = await Model.create(req.body);

    // API response:
    oneDocApiReponse(res, 201, { doc: newDoc });
  });

export const deleteOneById = (Model) =>
  asyncHandler(async (req, res, next) => {
    // find doc and delete by ID:
    const doc = await Model.findByIdAndDelete(req.params.id);

    // Gaurd:
    if (!doc) return next(new AppError(404, 'No document found with that ID.'));

    // API response:
    oneDocApiReponse(res, 204, { doc: null });
  });
