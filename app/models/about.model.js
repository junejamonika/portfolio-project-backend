const mongoose = require("mongoose");

const About = mongoose.model(
  "About",
  new mongoose.Schema({
    description: String,
  })
);

module.exports = About;
