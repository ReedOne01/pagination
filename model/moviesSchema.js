const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  name: { type: String, required: true },
  // img: { type: String },
  genre: { type: Array, required: true },
  year: { type: Number, required: true },
  rating: { type: Number, required: true },
});

module.exports = mongoose.model("movies", movieSchema);
