const mongoose = require("mongoose");

const Contact = mongoose.model(
  "Contact",
  new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    services: Array,
  })
);

module.exports = Contact;
