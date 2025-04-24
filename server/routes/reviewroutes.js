const reviewRouter = require('express').Router();
const reviewController = require('../controller/reviewcontroller');
const authuser = require('../middleware/authuser');
const authAdminOrSeller = require('../middleware/authAdminOrSeller');

reviewRouter.post("/add/:productId",authuser ,reviewController.createReview); 
reviewRouter.get("/:productId", reviewController.getReviewsByProduct); 
reviewRouter.get("", reviewController.getAllReviews);
reviewRouter.post("/reply/:reviewId",authAdminOrSeller,reviewController.addReply);
reviewRouter.delete("/:reviewId",authuser, reviewController.deleteReview);

module.exports = reviewRouter;
