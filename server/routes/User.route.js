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

router.get('/getTopRatedReviews', review_controller.getTopRatedReviews);

//getting single review with respect to specific bike.
router.get('/getUserReview/:id', AuthVerifier, review_controller.getUserReview);

router.post('/deleteReview/:id', review_controller.deleteReview);

router.post('/updateReview/:id', AuthVerifier, review_controller.updateReview);

router.post('/message', user_controller.message);

module.exports = router;