const mongoose = require("mongoose");

const uri = "mongodb+srv://oops_moment:1u3OYcgMg9OYtZpJ@procastiwash0.7z5wl.mongodb.net/?retryWrites=true&w=majority&appName=procastiwash0";

const connectDB = () => {
  return mongoose.connect(uri);
};

module.exports = connectDB;