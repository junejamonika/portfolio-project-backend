const mongoose = require("mongoose");

const Value = mongoose.model(
  "Value",
  new mongoose.Schema({
    heading: String,
    subheading: String,
    image: String
  })
);

module.exports = Value;
