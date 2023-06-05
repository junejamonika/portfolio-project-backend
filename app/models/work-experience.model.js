const mongoose = require("mongoose");

const WorkExperience = mongoose.model(
  "WorkExperience",
  new mongoose.Schema({
    company: String,
    designation: String,
    year: String,
  })
);

module.exports = WorkExperience;
