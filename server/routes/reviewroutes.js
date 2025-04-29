const reviewRouter = require('express').Router();
const reviewController = require('../controller/reviewcontroller');
const { authUser, authAdminOrSeller, authAdminOrUser } = require('../middleware/authmiddleware');


reviewRouter.post("/add/:productId",authUser ,reviewController.createReview);
reviewRouter.get("/seller",authAdminOrUser,reviewController.getReviewsBySeller) 
reviewRouter.get("/:productId", reviewController.getReviewsByProduct); 
reviewRouter.get("", reviewController.getAllReviews);
reviewRouter.post("/reply/:reviewId",authAdminOrSeller,reviewController.addReply);
reviewRouter.delete("/:reviewId",authUser, reviewController.deleteReview);

module.exports = reviewRouter;
