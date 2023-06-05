const mongoose = require("mongoose");

const PassionProject = mongoose.model(
  "PassionProject",
  new mongoose.Schema({
    image: String
  })
);

module.exports = PassionProject;
