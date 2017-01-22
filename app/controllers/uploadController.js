
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const dir = './tmp';

// setup dir and size limit
const upload = multer({
  dest: dir,
  limits: { fileSize: 5 * Math.pow(10, 6) }
});

// checks file size then deletes the file
const fileCheck = (req, res, next) => {
  const fileInfo = {
    file: req.file.originalname,
    size: req.file.size
  };

  fs.readdir(dir, (err, files) => {
    if (err) console.error(err);
    files.forEach(file => fs.unlink(
      path.join(dir, file),
      err => err && console.error(err)
    ));
  });

  res.send(fileInfo);
};

module.exports.fileCheck = fileCheck;
module.exports.upload = upload;
