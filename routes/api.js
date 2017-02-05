'use strict';

const router = require('express').Router();
const onApi = require('../app/controllers/apiController');
const services = require('../app/services');

router.get('/api', (req, res) => onApi(req, res, services));

module.exports = router;
