const { authJwt } = require("../middlewares");
const controller = require("../controllers/work.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/work", [], controller.workList);
  app.post("/api/work", [authJwt.verifyToken, upload.array('images', 7)], controller.create);
  app.get("/api/work/:id", [authJwt.verifyToken], controller.edit);
  app.put("/api/work/:id", [authJwt.verifyToken, upload.array('images', 7)], controller.update);
  app.delete("/api/delete-work/:id", [authJwt.verifyToken], controller.deleteWork);
};
