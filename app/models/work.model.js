const mongoose = require("mongoose");

const Work = mongoose.model(
  "Work",
  new mongoose.Schema({
    name: String,
    type: String,
    title: String,
    accomplishments: Array,
    tags: Array,
    images: Array
  })
);

module.exports = Work;
