const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const reviewController = require("../controllers/review.controller");

router.get("/games/:gameId/reviews", verifyToken, reviewController.getGameReviews);

router.post("/games/:gameId/reviews", verifyToken, reviewController.createReview);

router.put("/reviews/:reviewId", verifyToken, reviewController.updateReview);

router.delete("/reviews/:reviewId", verifyToken, reviewController.deleteReview);

module.exports = router;
