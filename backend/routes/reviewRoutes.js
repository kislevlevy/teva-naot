import { Router } from "express";

import {
  getReviews,
  addReview,
  editReview,
  deleteReview,
  filterByRating,
  getAverageReview,
} from "../controllers/reviewController";

const router = Router();

router.route("/getReviews").get(getReviews);
router.route("/addReview").post(protect, addReview);
router.route("/editReview").patch(protect, editReview);
router.route("/deleteReview").delete(protect, deleteReview);
router.route("/filterByRating").get(filterByRating);
router.route("getAverageReview").get(getAverageReview);
