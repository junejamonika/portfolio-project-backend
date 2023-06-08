const db = require("../models");
const Work = db.work;
var fs = require("fs");

exports.workList = (req, res) => {
  const requestCount = req.query.limit;
  var totalCount = 0;
  Work.find()
    .countDocuments()
    .then((count) => {
      totalCount=count;
      // if requested count is more than actual count of posts in database
      if (requestCount > count) {
        return Work.find().limit(Number(count));
      }
      //returning posts while limiting the count
      return Work.find().limit(Number(requestCount));
    })
    .then((works) => {
      var workMap = {};
      works.forEach(function (work) {
        workMap[work._id] = work;
        work.images = work.images.map(
          (img) => `${process.env.BASE_URL}uploads/${img}`
        );
      });

      res.status(200).send({
        data: works,
        success: 1,
        count:totalCount,
      });
    })
    .catch((error) => {
      const status = error.statusCode || 500;
      console.log(error);
      res.status(status).json({ error: error });
    });
};

exports.create = (req, res) => {
  var images = [];
  console.log(req.files, "files");
  req.files.map(async (file) => {
    images.push(file.filename);
  });
  var obj = new Work({
    name: req.body.name,
    type: req.body.type,
    title: req.body.title,
    accomplishments: JSON.parse(req.body.accomplishments),
    tags: JSON.parse(req.body.tags),
    images: images,
  });
  obj
    .save(obj)
    .then((data) => {
      res.send({ success: 1, message: "Work Added Successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while saving",
      });
    });
};

exports.edit = (req, res) => {
  const id = req.params.id;

  Work.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find Work`,
        });
      } else {
        for (var i = 0; i < data.images.length; i++) {
          data.images[i] = `${process.env.BASE_URL}uploads/${data.images[i]}`;
        }
        res.send({
          data: data,
          success: 1,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot find Work",
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

  Work.findById(id, function (err, data) {
    if (!err) {
      data.name = req.body.name;
      data.type = req.body.type;
      data.title = req.body.title;
      data.accomplishments = JSON.parse(req.body.accomplishments);
      data.tags = JSON.parse(req.body.tags);
      if (req.files.length > 0) {
        var images = [];
        req.files.map(async (file) => {
          images.push(file.filename);
        });
        data.images = images;
      }
      if (req.body.dltImages) {
        var dltImages = JSON.parse(req.body.dltImages);
        dltImages.forEach((img) => {
          const image = img.split("/").pop();
          var updatedImages = data.images.filter(function (item) {
            return item !== image;
          });
          console.log(data.images);
          data.images = updatedImages;
          const pathToFile = `./public/uploads/${image}`;
          fs.unlink(pathToFile, function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log("Successfully deleted the image");
            }
          });
        });
      }
      console.log(data.images);
      data.save(function (err) {
        if (!err) {
          res.send({
            success: 1,
            message: "Work updated successfully.",
          });
        } else {
          res.status(500).send({
            message: "Error updating Work",
          });
        }
      });
    } else {
      res.status(500).send({
        message: "Error updating Work",
      });
    }
  });
};

exports.deleteWork = (req, res) => {
  const id = req.params.id;

  Work.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Work`,
        });
      } else {
        data.images.forEach((img) => {
          const pathToFile = `./public/uploads/${img}`;
          fs.unlink(pathToFile, function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log("Successfully deleted the file.");
            }
          });
        });
        res.send({
          message: "Work is deleted successfully!",
          success: 1,
        });
      }
    })
    .catch((err) => {
      console.log(err, "zmhdsvgm");
      res.status(500).send({
        message: "Cannot delete Work",
      });
    });
};
