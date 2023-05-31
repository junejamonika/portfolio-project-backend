const express = require("express");
const cors = require("cors");
const config = require("./app/config/");
var bodyParser = require('body-parser');
var bcrypt = require("bcryptjs");

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://smeet-makwana.netlify.app"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: true
}));

const db = require("./app/models");
const User = db.user;
const About = db.about;

db.mongoose
   .connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to this application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/faq.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


function initial() {
  User.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new User({
        username: "smeetmakwana",
        password: bcrypt.hashSync('abcd,./0', 8)
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to user collection");
      });
    }
  });
  About.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new About({
        description: "This is test description",
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'description' to about collection");
      });
    }
  });
}
