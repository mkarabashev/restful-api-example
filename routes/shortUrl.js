'use strict';

const router = require('express').Router();
const onUrl = require('../app/controllers/shortUrlController');

router.get('/:shortUrl', onUrl);

module.exports = router;
