const express = require('express');
const router = express.Router();

const event_controller = require('../controllers/Event.controller');
const AuthVerifier = require('../middleware/AuthVerifier');

router.get('/getEvents', event_controller.getEvents);

router.get('/postEvent', AuthVerifier, event_controller.postEvent);