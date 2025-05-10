const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller');
const path = require('path');
const fs = require('fs');
const verifyToken =require('../middleware/auth');

router.post('/register', Controller.register);
router.post('/login',Controller.login);
router.post('/registeractivities',verifyToken,Controller.createActivity)
router.get('/getactivites',verifyToken,Controller.getAllActivities)
router.get('/getactivity/:id',verifyToken,Controller.getActivityById)
router.post('/bookactivity', verifyToken, Controller.bookActivity);
router.get('/mybookings', verifyToken, Controller.getUserBookings);

module.exports = router;

