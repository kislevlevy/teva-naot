import asyncHandler from 'express-async-handler';
import multer from 'multer';
import dotenv from 'dotenv';

import { v2 as cloudinary } from 'cloudinary';
import { createReadStream } from 'streamifier';

import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import ProductColor from '../models/productColorModel.js';

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const fileFilter = (req, file, cb) => {
  const errStr = 'The file is not compatible with this application.';
  if (!file.mimetype.startsWith('image')) cb(new AppError(404, errStr), false);
  else cb(null, true);
};
const memoryStorage = multer.memoryStorage();
export const upload = multer({ storage: memoryStorage, fileFilter });

const createStream = (folder, id, file) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: id,
        overwrite: true,
      },
      (err, res) => (res ? resolve(res) : reject(err))
    );
    createReadStream(file).pipe(stream);
  });

export const uploadProfileImage = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;

  const upload = await createStream(`teva-naot/users`, _id, req.file.buffer);

  req.user = await User.findByIdAndUpdate(
    _id,
    { profileImg: upload.url },
    { new: true }
  );

  delete req.file;
  next();
});

export const uploadProductImage = asyncHandler(async (req, res, next) => {
  const { _id } = req.doc;

  const upload = await createStream(
    `teva-naot/products/${_id}`,
    _id,
    req.file.buffer
  );

  req.doc = await Product.findByIdAndUpdate(
    _id,
    { image: upload.url },
    { new: true }
  );

  delete req.file;
  next();
});

export const uploadProductColorImages = asyncHandler(async (req, res, next) => {
  const { _id, product } = req.doc;

  const uploads = await Promise.all(
    req.files['images'].map((file, i) =>
      createStream(
        `teva-naot/products/${product}/colors`,
        `${_id}_${i}`,
        file.buffer
      )
    )
  );
  const returendData = { images: uploads.map((ele) => ele.url) };

  // req.files['thumbnail'] &&
  //   (returendData.thumbnail = [
  //     'img',
  //     await createStream(
  //       `teva-naot/products/${_id}`,
  //       _id,
  //       req.files['thumbnail'][0].buffer
  //     ),
  //   ]);

  req.doc = await ProductColor.findByIdAndUpdate(_id, returendData, { new: true });

  delete req.files;
  next();
});
