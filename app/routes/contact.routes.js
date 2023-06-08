const { authJwt } = require("../middlewares");
const controller = require("../controllers/contact.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/contact", [authJwt.verifyToken], controller.contactList);
  app.post("/api/contact", [], controller.create);
  app.delete("/api/delete-contact/:id", [authJwt.verifyToken], controller.deleteContact);
};
