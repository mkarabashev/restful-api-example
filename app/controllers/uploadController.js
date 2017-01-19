'use strict';

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const dir = './tmp';

const upload = multer({
  dest: dir,
  limits: { fileSize: 5 * Math.pow(10, 6) }
});

const fileCheck = (req, res, next) => {
  const fileInfo = {
    file: req.file.originalname,
    size: req.file.size
  };

  fs.readdir(dir, (err, files) => {
    if (err) console.error(err);

    files.forEach(file => fs.unlink(path.join(dir, file), err => err ? console.log(err) : ''));
  });

  res.send(fileInfo);
};

module.exports.fileCheck = fileCheck;
module.exports.upload = upload;
