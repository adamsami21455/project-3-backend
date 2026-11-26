const mongoose = require("mongoose");
const Review = require("../models/Review");
const Game = require("../models/Game");

async function getGameReviews(req, res) {
  try {
    const { gameId } = req.params;

    if (!mongoose.isValidObjectId(gameId)) return res.status(404).json({ message: "Game not found." });

    const foundGame = await Game.findById(gameId);
    if (!foundGame) return res.status(404).json({ message: "Game not found." });

    const allReviews = await Review.find({ game: gameId })
      .populate("author", "username")
      .sort({ createdAt: -1 });

    return res.status(200).json(allReviews);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function createReview(req, res) {
  try {
    const { gameId } = req.params;
    const { rating, body } = req.body;

    if (!mongoose.isValidObjectId(gameId)) return res.status(404).json({ message: "Game not found." });
    if (!rating || !body) return res.status(400).json({ message: "Rating and body are required." });

    const foundGame = await Game.findById(gameId);
    if (!foundGame) return res.status(404).json({ message: "Game not found." });

    const createdReview = await Review.create({
      rating,
      body,
      game: gameId,
      author: req.user._id,
    });

    await createdReview.populate("author", "username");

    return res.status(201).json(createdReview);
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateReview(req, res) {
  try {
    const { reviewId } = req.params;
    const { rating, body } = req.body;

    if (!mongoose.isValidObjectId(reviewId)) return res.status(404).json({ message: "Review not found." });

    const foundReview = await Review.findById(reviewId);
    if (!foundReview) return res.status(404).json({ message: "Review not found." });

    if (!foundReview.author.equals(req.user._id)) {
      return res.status(403).json({ message: "You can only edit your own reviews." });
    }

    if (rating !== undefined) foundReview.rating = rating;
    if (body !== undefined) foundReview.body = body;

    const updatedReview = await foundReview.save();
    await updatedReview.populate("author", "username");

    return res.status(200).json(updatedReview);
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteReview(req, res) {
  try {
    const { reviewId } = req.params;

    if (!mongoose.isValidObjectId(reviewId)) return res.status(404).json({ message: "Review not found." });

    const foundReview = await Review.findById(reviewId);
    if (!foundReview) return res.status(404).json({ message: "Review not found." });

    if (!foundReview.author.equals(req.user._id)) {
      return res.status(403).json({ message: "You can only delete your own reviews." });
    }

    const deletedReview = await Review.findByIdAndDelete(reviewId);

    return res.status(200).json(deletedReview);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  getGameReviews,
  createReview,
  updateReview,
  deleteReview,
};
