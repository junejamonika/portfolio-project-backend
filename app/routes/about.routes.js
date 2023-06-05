const { authJwt, upload } = require("../middlewares");
const controller = require("../controllers/about.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/about-me", [], controller.aboutMe);

  // Values
  app.get("/api/values", [], controller.values);
  app.post("/api/value", [authJwt.verifyToken, upload.single('image')], controller.addValue);
  app.put("/api/value/:id", [authJwt.verifyToken, upload.single('image')], controller.updateValue);
  app.delete("/api/delete-value/:id", [authJwt.verifyToken], controller.deleteValue);

  // Tools
  app.get("/api/tools", [], controller.tools);
  app.post("/api/tool", [authJwt.verifyToken, upload.single('image')], controller.addTool);
  app.put("/api/tool/:id", [authJwt.verifyToken, upload.single('image')], controller.updateTool);
  app.delete("/api/delete-tool/:id", [authJwt.verifyToken], controller.deleteTool);

  // Passion Projects
  app.get("/api/projects", [], controller.passionProjects);
  app.post("/api/project", [authJwt.verifyToken, upload.single('image')], controller.addPassionProject);
  app.put("/api/project/:id", [authJwt.verifyToken, upload.single('image')], controller.updatePassionProject);
  app.delete("/api/delete-project/:id", [authJwt.verifyToken], controller.deletePassionProject);

  // Work Experience
  app.get("/api/experiences", [], controller.workExperiences);
  app.post("/api/experience", [authJwt.verifyToken], controller.addWorkExperience);
  app.put("/api/experience/:id", [authJwt.verifyToken], controller.updateWorkExperience);
  app.delete("/api/delete-experience/:id", [authJwt.verifyToken], controller.deleteWorkExperience);

};
