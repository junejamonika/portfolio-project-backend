const mongoose = require("mongoose");

const Tool = mongoose.model(
  "Tool",
  new mongoose.Schema({
    name: String,
    image: String
  })
);

module.exports = Tool;
