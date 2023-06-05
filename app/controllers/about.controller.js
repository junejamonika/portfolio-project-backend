const db = require("../models");
const About = db.about;
const Value = db.value;
const Tool = db.tool;
const PassionProject = db.passion_project;
const WorkExperience = db.work_experience;
var fs = require("fs");
var path = require("path");

exports.aboutMe = (req, res) => {
  About.findOne({}, function (err, about) {
    if (err) {
      res.status(500).send({ success: 0 });
    }

    res.status(200).send({
      data: about,
      success: 1,
    });
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  About.findOneAndUpdate({}, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update About`,
        });
      } else res.send({ success: 1, message: "Updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Internal Server Error",
      });
    });
};

exports.values = (req, res) => {
  Value.find({}, function (err, values) {
    if (err) {
      res.status(500).send({ success: 0 });
    }
    var valueMap = {};

    values.forEach(function (value) {
      valueMap[value._id] = value;
      value.image = `${process.env.BASE_URL}uploads/${value.image}`;
    });

    res.status(200).send({
      data: values,
      success: 1,
    });
  });
};

exports.addValue = (req, res) => {
  var obj = new Value({
    heading: req.body.heading,
    subheading: req.body.subheading,
    image: req.file.filename,
  });
  obj
    .save(obj)
    .then((data) => {
      res.send({ success: 1, message: "Value & Belief Added Successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while saving",
      });
    });
};

exports.updateValue = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Value.findById(id, function (err, data) {
    if (!err) {
      data.heading = req.body.heading;
      data.subheading = req.body.subheading;
      if (req.file) {
        const pathToFile = `./public/uploads/${data.image}`;
        fs.unlink(pathToFile, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Successfully deleted the file.");
          }
        });
        data.image = req.file.filename;
      }
      data.save(function (err) {
        if (!err) {
          res.send({
            success: 1,
            message: "Value & Belief updated successfully.",
          });
        } else {
          res.status(500).send({
            message: "Error updating Value & Belief",
          });
        }
      });
    } else {
      res.status(500).send({
        message: "Error updating Value & Belief",
      });
    }
  });
};

exports.deleteValue = (req, res) => {
  const id = req.params.id;

  Value.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Value & Belief`,
        });
      } else {
        const pathToFile = `./public/uploads/${data.image}`;

        fs.unlink(pathToFile, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Successfully deleted the file.");
          }
        });
        res.send({
          message: "Value & Belief is deleted successfully!",
          success: 1,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot delete Value & Belief",
      });
    });
};

//Tools 

exports.tools = (req, res) => {
  Tool.find({}, function (err, tools) {
    if (err) {
      res.status(500).send({ success: 0 });
    }
    var toolMap = {};

    tools.forEach(function (tool) {
      toolMap[tool._id] = tool;
      tool.image = `${process.env.BASE_URL}uploads/${tool.image}`;
    });

    res.status(200).send({
      data: tools,
      success: 1,
    });
  });
};

exports.addTool = (req, res) => {
  var obj = new Tool({
    name: req.body.name,
    image: req.file.filename,
  });
  obj
    .save(obj)
    .then((data) => {
      res.send({ success: 1, message: "Tool & Service Added Successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while saving",
      });
    });
};

exports.updateTool = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Tool.findById(id, function (err, data) {
    if (!err) {
      data.name = req.body.name;
      if (req.file) {
        const pathToFile = `./public/uploads/${data.image}`;
        fs.unlink(pathToFile, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Successfully deleted the file.");
          }
        });
        data.image = req.file.filename;
      }
      data.save(function (err) {
        if (!err) {
          res.send({
            success: 1,
            message: "Tool & Service updated successfully.",
          });
        } else {
          res.status(500).send({
            message: "Error updating Tool & Service",
          });
        }
      });
    } else {
      res.status(500).send({
        message: "Error updating Tool & Service",
      });
    }
  });
};

exports.deleteTool = (req, res) => {
  const id = req.params.id;

  Tool.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tool & Service`,
        });
      } else {
        const pathToFile = `./public/uploads/${data.image}`;

        fs.unlink(pathToFile, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Successfully deleted the file.");
          }
        });
        res.send({
          message: "Tool & Service is deleted successfully!",
          success: 1,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot delete Tool & Service",
      });
    });
};

//Passion Projects

exports.passionProjects = (req, res) => {
  PassionProject.find({}, function (err, projects) {
    if (err) {
      res.status(500).send({ success: 0 });
    }
    var projectMap = {};

    projects.forEach(function (project) {
      projectMap[project._id] = project;
      project.image = `${process.env.BASE_URL}uploads/${project.image}`;
    });

    res.status(200).send({
      data: projects,
      success: 1,
    });
  });
};

exports.addPassionProject = (req, res) => {
  var obj = new PassionProject({
    image: req.file.filename,
  });
  obj
    .save(obj)
    .then((data) => {
      res.send({ success: 1, message: "Passion Project Added Successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while saving",
      });
    });
};

exports.updatePassionProject = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  PassionProject.findById(id, function (err, data) {
    if (!err) {
      if (req.file) {
        const pathToFile = `./public/uploads/${data.image}`;
        fs.unlink(pathToFile, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Successfully deleted the file.");
          }
        });
        data.image = req.file.filename;
      }
      data.save(function (err) {
        if (!err) {
          res.send({
            success: 1,
            message: "Passion Project updated successfully.",
          });
        } else {
          res.status(500).send({
            message: "Error updating Passion Project",
          });
        }
      });
    } else {
      res.status(500).send({
        message: "Error updating Passion Project",
      });
    }
  });
};

exports.deletePassionProject = (req, res) => {
  const id = req.params.id;

  PassionProject.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Passion Project`,
        });
      } else {
        const pathToFile = `./public/uploads/${data.image}`;

        fs.unlink(pathToFile, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Successfully deleted the file.");
          }
        });
        res.send({
          message: "Passion Project is deleted successfully!",
          success: 1,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot delete Passion Project",
      });
    });
};

//Work Experience

exports.workExperiences = (req, res) => {
  WorkExperience.find({}, function (err, experience) {
    if (err) {
      res.status(500).send({ success: 0 });
    }
    var experienceMap = {};

    experience.forEach(function (experience) {
      experienceMap[experience._id] = experience;
    });

    res.status(200).send({
      data: experience,
      success: 1,
    });
  });
};

exports.addWorkExperience = (req, res) => {
  var obj = new WorkExperience({
    company: req.body.company,
    designation: req.body.designation,
    year: req.body.year
  });
  obj
    .save(obj)
    .then((data) => {
      res.send({ success: 1, message: "Work Experience Added Successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while saving",
      });
    });
};

exports.updateWorkExperience = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  WorkExperience.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
  .then((data) => {
    if (!data) {
      res.status(404).send({
        message: `Cannot update Work Experience`,
      });
    } else res.send({ success: 1, message: "Work Experience updated successfully." });
  })
  .catch((err) => {
    res.status(500).send({
      message: "Error updating Work Experience",
    });
  });
};

exports.deleteWorkExperience = (req, res) => {
  const id = req.params.id;

  WorkExperience.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Work Experience`,
        });
      } else {
        res.send({
          message: "Work Experience is deleted successfully!",
          success:1
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot delete Work Experience",
      });
    });
};

