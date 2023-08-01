require("dotenv").config();
const express = require("express");
const moviesRoute = require("./routes/moviesRoute");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();

connectDB(process.env.MONGO_URI);

app.use(express.json());
app.use(cors());
app.use("/api/v1/paginate", moviesRoute);

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
