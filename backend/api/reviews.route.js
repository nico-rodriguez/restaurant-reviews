import express from 'express';
import ReviewsController from './reviews.controller.js';


const router = express.Router();

router
  .route('/:restaurantId/reviews')
  .post(ReviewsController.apiPostReview);
router
  .route('/:restaurantId/reviews/:reviewId')
  .put(ReviewsController.apiUpdateReview)
  .delete(ReviewsController.apiDeleteReview);

export default router;