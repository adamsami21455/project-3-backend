const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    platform: {
      type: String,
      enum: ["PC", "PlayStation", "Xbox", "Switch", "Mobile", "Other"],
    },
    genre: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Playing", "Completed", "Dropped"],
      default: "Playing",
    },
    personalRating: {
      type: Number,
      min: 1,
      max: 5,
    },
    coverImage: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
