const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/User.controller');
const review_controller = require('../controllers/Review.controller');
const { AuthVerifier } = require('../middleware/AuthVerifier');

router.post('/postAd', user_controller.postAd);

router.get('/getAds', AuthVerifier, user_controller.getAds);

router.get('/getAd/:id', user_controller.getAd);

router.post('/postReview', AuthVerifier, review_controller.postReview);

router.get('/getReviews/:id', review_controller.getReviews);

module.exports = router;