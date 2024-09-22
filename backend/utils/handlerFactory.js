// Imports:
import asyncHandler from 'express-async-handler';

import AppError from './appError.js';
import ApiFeatures from './apiFeatures.js';
import mongoose from 'mongoose';

// Helper functions:
export const oneDocApiResponse = (res, statusCode, data) =>
  res.status(statusCode).json({
    status: 'success',
    data,
  });
export const manyDocsApiResponse = (res, statusCode, data) =>
  res.status(statusCode).json({
    status: 'success',
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

export const simpleResponse = (req, res) =>
  oneDocApiResponse(res, 200, { doc: req.doc });

// Functions:
export const getMany = (Model) =>
  asyncHandler(async (req, res, next) => {
    // Execute query:
    const features = new ApiFeatures(req, Model.find());
    features.filter().sort().fields().pagination();

    // Awaiting for docs array:
    const docs = await features.find;

    let data = {};
    if (docs.length > 0) {
      const aggregationPipeline = [
        {
          $group: {
            _id: null,
            totalResults: { $sum: 1 },
            minPrice: { $min: '$price' },
            maxPrice: { $max: '$price' },
            minSize: { $min: { $arrayElemAt: ['$availableSizes', 0] } },
            maxSize: { $max: { $arrayElemAt: ['$availableSizes', 1] } },
          },
        },
      ];
      if (req.query.category)
        aggregationPipeline.unshift({ $match: { category: req.query.category } });
      const aggregatedData = await Model.aggregate(aggregationPipeline);
      const { totalResults, minPrice, maxPrice, minSize, maxSize } =
        aggregatedData[0];

      data = {
        results: totalResults,
        prices: { min: minPrice, max: maxPrice },
        sizes: { min: minSize, max: maxSize },
      };
    }
    // API response:
    manyDocsApiResponse(res, 200, { docs, data });
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
    oneDocApiResponse(res, 200, { doc });
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
    req.doc = await Model.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (req.file || req.files) return next();

    // API response:
    oneDocApiResponse(res, 200, { doc: req.doc });
  });

export const createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { body } = req;

    // Gaurd for body in request:
    const { outputBody, errorBody } = reqBodyCheck(body);
    if (!errorBody) return next(outputBody);

    // Create new document:
    req.doc = await Model.create(body);

    if (req.file || req.files) return next();

    // API response:
    oneDocApiResponse(res, 201, { doc: req.doc });
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
    oneDocApiResponse(res, 204, { doc: null });
  });
