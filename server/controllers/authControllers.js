const users = require('../config/db');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');


const signup =  async (req, res) => {
  const { email, password } = req.body;

  // Check if the user already exists
  const user = users.find(user => user.email === email);

  if (user) {
    return res.status(400).json({ Error: "User already exists" });
  }

  try {
    // Hash the password asynchronously
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add the new user to the users array
    users.push({ email, password: hashedPassword });

    // Generate a JWT token
    const token = JWT.sign({ email }, process.env.SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: `Signup complete for ${email}`, token });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ Error: 'Internal server error' });
  }
}


const login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email);

  if (!user) {
    return res.status(400).json({ Error: "Invalid credentials" });
  }

  try {
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ Error: "Invalid credentials" });
    }

    const token = JWT.sign({ email }, process.env.SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: `Login successful for ${email}`, token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ Error: 'Internal server error' });
  }
}


module.exports = {signup, login}