const express = require('express');
const router = express.Router(); // Use "router" for clarity
const validateResult = require('../middleware/validateMiddleware');
const users = require('../config/db');
const {login,signup} = require('../controllers/authControllers')
require('dotenv').config();

router.use(validateResult)
// Sign Up Route
router.post('/signup' ,signup);

// Login Route
router.post('/login',signup );


module.exports = router;
