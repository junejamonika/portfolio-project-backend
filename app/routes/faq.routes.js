const { authJwt } = require("../middlewares");
const controller = require("../controllers/faq.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/faqs", [], controller.faqs);
  app.post("/api/faq", [authJwt.verifyToken], controller.create);
  app.get("/api/faq/:id", [authJwt.verifyToken], controller.edit);
  app.put("/api/faq/:id", [authJwt.verifyToken], controller.update);
  app.delete("/api/delete-faq/:id", [authJwt.verifyToken], controller.deleteFaq);

};
