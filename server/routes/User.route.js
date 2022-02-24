const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/User.controller');
const { AuthVerifier } = require('../middleware/AuthVerifier');

router.post('/postAd', user_controller.postAd);

router.get('/getAds', AuthVerifier, user_controller.getAds);

router.get('/getAd/:id', user_controller.getAd);

module.exports = router;