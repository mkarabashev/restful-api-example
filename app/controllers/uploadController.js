'use strict';

const multer = require('multer');
const fs = require('fs');

const upload = multer({
  dest: __dirname + '/tmp'
});

const fileCheck = (req, res, next) => {
  const dir = __dirname + '/tmp';
  const fileInfo = {
    file: req.file.originalname,
    size: req.file.size
  };

  fs.readdir(dir, (err,files) => {
    files.forEach(file => fs.unlink(dir + '/' + file, err => err ? console.log(err) : ''));
  });

  res.send(fileInfo);
};

module.exports.fileCheck = fileCheck;
module.exports.upload = upload;
