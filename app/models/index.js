const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.faq = require("./faq.model");
db.about = require("./about.model");
db.value = require("./value.model");
db.tool = require("./tool.model");
db.passion_project = require("./passion-project.model");
db.work_experience = require("./work-experience.model");
db.work = require("./work.model");
db.contact = require("./contact.model");
db.service = require("./service.model");

module.exports = db;
