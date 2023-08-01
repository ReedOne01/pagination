const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    const res = await mongoose.connect(uri);
    console.log(`server connected successfully with ${res.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
