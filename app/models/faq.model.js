const mongoose = require("mongoose");

const Faq = mongoose.model(
  "Faq",
  new mongoose.Schema({
    question: String,
    answer: String,
  })
);

module.exports = Faq;
