const mongoose = require("mongoose");

const Service = mongoose.model(
  "Service",
  new mongoose.Schema({
    image: String,
    name: String,
    desc: String,
    list:Array
  })
);

module.exports = Service;
