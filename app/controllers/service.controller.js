const db = require("../models");
const Service = db.service;
var fs = require("fs");

exports.services = (req, res) => {
  Service.find({}, function (err, services) {
    if (err) {
      res.status(500).send({ success: 0 });
    }
    var serviceMap = {};

    services.forEach(function (service) {
      serviceMap[service._id] = service;
      service.image = `${process.env.BASE_URL}uploads/${service.image}`;
    });

    res.status(200).send({
      data: services,
      success: 1,
    });
  });
};

exports.addService = (req, res) => {
  var obj = new Service({
    image: req.file.filename,
    name: req.body.name,
    desc: req.body.desc,
    list: JSON.parse(req.body.list),
  });
  obj
    .save(obj)
    .then((data) => {
      res.send({ success: 1, message: "Service Added Successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while saving",
      });
    });
};

exports.edit = (req, res) => {
  const id = req.params.id;

  Service.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find Service`,
        });
      } else {
        data.image = `${process.env.BASE_URL}uploads/${data.image}`;
        res.send({
          data: data,
          success: 1,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot find Service",
      });
    });
};

exports.updateService = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Service.findById(id, function (err, data) {
    if (!err) {
      data.name = req.body.name;
      data.desc = req.body.desc;
      data.list = JSON.parse(req.body.list);
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
            message: "Service & Belief updated successfully.",
          });
        } else {
          res.status(500).send({
            message: "Error updating Service",
          });
        }
      });
    } else {
      res.status(500).send({
        message: "Error updating Service",
      });
    }
  });
};

exports.deleteService = (req, res) => {
  const id = req.params.id;

  Service.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Service`,
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
          message: "Service is deleted successfully!",
          success: 1,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Cannot delete Service",
      });
    });
};
