const users = require('../config/db');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  const user = users.find(user => user.email === email);
  if (user) {
    return res.status(400).json({ success: false, error: "User already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { fullname, email, password: hashedPassword };
    users.push(newUser);

    const token = JWT.sign({ email, fullname }, process.env.SECRET, { expiresIn: '1h' });

    res.status(201).json({ 
      success: true,
      message: `Signup complete for ${email}`,
      user: newUser, 
      token 
    });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(400).json({ success: false, error: "Invalid credentials" });
  }

  try {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: "Invalid credentials" });
    }

    const token = JWT.sign({ email, fullname: user.fullname }, process.env.SECRET, { expiresIn: '1h' });

    res.status(200).json({ 
      success: true,
      message: `Login successful for ${email}`,
      user,
      token
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

module.exports = { signup, login };
