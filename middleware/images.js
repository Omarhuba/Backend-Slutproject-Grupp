const multer = require('multer')

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/images')
  },
  filename: function (req, file, cb) {
    const mimeExtension = {
      'image/png': '.png',
        'image/svg': '.svg',
        'image/jpg':'.jpg',
      'image/jepg': '.jepg'
    }
    cb(null, file.originalname.split('.')[0] + '.' + Date.now() + mimeExtension[file.mimetype])
  }
})


const imageUpload = multer({
  storage: storage,
    fileFilter: (req, file, cb) => {

    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/svg' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jepg') {
      cb(null, true)
    } else {
      cb(null, false)
      req.fileError = 'File format is not valid'
    }
        console.log('I m knocked!')
  }
}).single('image')

module.exports = {imageUpload}