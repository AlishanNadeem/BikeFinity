const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/User.controller');
const { AuthVerifier } = require('../middleware/AuthVerifier');

router.post('/postAd', user_controller.postAd);

router.get('/getAds', user_controller.getAds);

module.exports = router;