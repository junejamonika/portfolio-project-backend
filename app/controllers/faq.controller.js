const config = require("../config/auth.config");
const db = require("../models");
const Faq = db.faq;

exports.faqs = (req, res) => {
  Faq.find({}, function (err, faqs) {
    if (err) {
      res.status(500).send({ success: 0 });
    }
    var faqMap = {};

    faqs.forEach(function (faq) {
      faqMap[faq._id] = faq;
    });

    res.status(200).send({
      data: faqs,
      success: 1,
      test: "test",
    });
  });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body.question) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create faq
  const faq = new Faq({
    question: req.body.question,
    answer: req.body.answer,
  });

  // Save Faq in the database
  faq
    .save(faq)
    .then((data) => {
      res.send({
        success:1,
        message: "FAQ added successfully!"
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while adding faq",
      });
    });
};

exports.edit = (req, res) => {
  const id = req.params.id;

  Faq.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find FAQ`,
        });
      } else {
        res.send({
          data: data,
          success:1,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot find FAQ",
      });
    });
  };


exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Faq.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Faq`,
        });
      } else res.send({ success: 1, message: "FAQ updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Faq",
      });
    });
};

exports.deleteFaq = (req, res) => {
  const id = req.params.id;

  Faq.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete FAQ`,
        });
      } else {
        res.send({
          message: "FAQ is deleted successfully!",
          success:1
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot delete FAQ",
      });
    });
  };
