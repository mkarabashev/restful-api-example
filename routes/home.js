
const router = require('express').Router();
const homePage = require('../app/controllers/indexController');

router.get('/', homePage);

module.exports = router;
