const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.faq = require("./faq.model");
db.about = require("./about.model");

module.exports = db;
