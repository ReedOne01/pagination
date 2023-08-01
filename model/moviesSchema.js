const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String },
  genre: { type: Array, required: true },
  year: { type: String, required: true },
  rating: { type: String, required: true },
});

module.exports = mongoose.model("movies", movieSchema);
