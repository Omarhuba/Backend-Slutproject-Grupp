const multer = require("multer");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/images");
  },
  filename: function (req, file, cb) {
    let [first, last] = file.originalname.split(".");
    
    if (last == "svg+xml") {
      last = "svg";
    }

    cb(null, first + "." + Date.now() + "." + last);
  },
});

const imageUpload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/svg" ||
      file.mimetype === "image/svg+xml" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      req.fileError = "File format is not valid";
    }
    console.log("I m knocked!");
  },
}).single("image");

module.exports = { imageUpload };
