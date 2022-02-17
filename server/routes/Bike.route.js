const express = require('express');
const router = express.Router();

const bike_controller = require('../controllers/Bike.controller');

router.get('/bikes', bike_controller.getAllBikes);

router.get('/make', bike_controller.getBikeMake);

module.exports = router;