
const router = require('express').Router();
const ctrl = require('../app/controllers/uploadController');

router.post('/upload', ctrl.upload.single('checkedFile'), ctrl.fileCheck);

module.exports = router;
