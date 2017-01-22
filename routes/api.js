
const router = require('express').Router();
const onApi = require('../app/controllers/apiController');

router.get('/api', onApi);

module.exports = router;
