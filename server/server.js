const express = require('express');
const app = express();
const users = require('./config/db')
app.use(express.json());



// Use the routes properly
app.use('/auth', require('./routes/authRoutes')); 

// Get All Users Route
app.get('/', (req, res) => {
  res.json({ users });
});

app.listen(5000, () => console.log('Server listening on port 5000'));
