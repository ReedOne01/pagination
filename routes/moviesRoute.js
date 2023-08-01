const router = require("express").Router();
const Movie = require("../model/moviesSchema");
const movies = require("../config/movies.json");

router.get("/movies", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = parseInt(req.query.search) || "";
    const sort = parseInt(req.query.sort) || "rating";
    const genre = parseInt(req.query.genre) || "All";

    const genreOptions = [
      "Action",
      "Drama",
      "Fantasy",
      "Crime",
      "Romance",
      "Thriller",
      "Sci-fi",
      "Music",
      "Family",
    ];
    genre === "All"
      ? (genre = [...genreOptions])
      : (genre = req.query.genre.split(","));
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    const movies = await Movie.find({ name: { $regex: search, $options: "i" } })
      .where("genre")
      .in([...genre])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await Movie.countDocuments({
      genre: { $in: [...genre] },
      name: { $regex: search, $options: "i" },
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      genres: genreOptions,
      movies,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
});

// trying to upload movies to the database manually with the below function

// const insertMovies = async () => {
//   try {
//     const docs = await Movie.insertMany(movies);
//     return Promise.resolve(docs);
//   } catch (error) {
//     console.log(error);
//     Promise.reject(error);
//   }
// };

// insertMovies()
//   .then((docs) => console.log(docs))
//   .catch((error) => console.log(error));

router.post("/", async (req, res) => {
  try {
    const info = req.body;
    const data = await Movie.create({
      info,
    });
    res.status(200).json(data);
    console.log("file written successfully");
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
