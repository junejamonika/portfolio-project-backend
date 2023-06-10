const { authJwt, upload } = require("../middlewares");
const controller = require("../controllers/service.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Values
  app.get("/api/services", [], controller.services);
  app.get(
    "/api/service/:id",
    [authJwt.verifyToken, upload.single("image")],
    controller.edit
  );
  app.post(
    "/api/service",
    [authJwt.verifyToken, upload.single("image")],
    controller.addService
  );
  app.put(
    "/api/service/:id",
    [authJwt.verifyToken, upload.single("image")],
    controller.updateService
  );
  app.delete(
    "/api/delete-service/:id",
    [authJwt.verifyToken],
    controller.deleteService
  );
};
