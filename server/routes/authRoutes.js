const express = require('express');
const router = express.Router(); // Use "router" for clarity
const validateResult = require('../middleware/validateMiddleware');
const users = require('../config/db');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken')
require('dotenv').config();

// Sign Up Route
router.post('/signup', validateResult, async (req, res) => {
  const { email, password } = req.body;

  // Check if the user already exists
  const user = users.find(user => user.email === email);

  if (user) {
    // If user exists, return an error message
    return res.status(400).json({ Error: "User already exists" });
  }

  try {
    // Hash the password asynchronously
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add the new user to the users array
    users.push({
      email,
      password: hashedPassword
    });

    const token = await JWT.sign({
      email
    },process.env.SECRET,{
      expiresIn: '1h'
    })
    // Respond with a success message
    res.status(201).json({ message: `Welcome ${email}`,token:token });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ Error: 'Internal server error' });
  }
});

module.exports = router;


router.get('/',(req,res)=>{
  res.json({users:users})
})