const db = require("../models");
const Contact = db.contact;
var fs = require("fs");
const MailService = require("../services/mailer");

exports.contactList = (req, res) => {
  Contact.find({}, function (err, contacts) {
    if (err) {
      res.status(500).send({ success: 0 });
    }
    var contactMap = {};

    contacts.forEach(function (contact) {
      contactMap[contact._id] = contact;
    });

    res.status(200).send({
      data: contacts,
      success: 1,
    });
  });
};

exports.create = (req, res) => {
  var obj = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    services: req.body.services,
  });
  obj
    .save(obj)
    .then((data) => {
      MailService({
        name: data.name,
        email: data.email,
        message: data.message,
        services: data.services.join(", "),
      });
      res.send({ success: 1, message: "Contact Added Successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while saving",
      });
    });
};

exports.deleteContact = (req, res) => {
  const id = req.params.id;

  Contact.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Messsage`,
        });
      } else {
        res.send({
          message: "Messsage is deleted successfully!",
          success: 1,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot delete Messsage",
      });
    });
};
