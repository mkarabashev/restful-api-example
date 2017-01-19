'use strict';

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const dir = './tmp';

const upload = multer({
  dest: dir
});

const fileCheck = (req, res, next) => {
  const fileInfo = {
    file: req.file.originalname,
    size: req.file.size
  };

  fs.readdir(dir, (err,files) => {
    files.forEach(file => fs.unlink(path.join(dir, file), err => err ? console.log(err) : ''));
  });

  res.send(fileInfo);
};

module.exports.fileCheck = fileCheck;
module.exports.upload = upload;
