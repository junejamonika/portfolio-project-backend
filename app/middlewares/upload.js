const path = require ('path');
const multer = require ('multer');

// storage engine for multer
const storageEngine = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// file filter for multer
const fileFilter = (req, file, callback) => {
  let pattern = /jpg|png|svg/; // reqex

  if (pattern.test(path.extname(file.originalname))) {
    callback(null, true);
  } else {
    callback("Error: not a valid file");
  }
};

// initialize multer
module.exports = upload = multer({
  storage: storageEngine,
  fileFilter,
});
