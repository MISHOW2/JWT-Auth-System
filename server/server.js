const express = require('express');

const app = express();

app.use(express.json());



// Use the routes properly
app.use('/auth', require('./routes/authRoutes')); 

app.listen(5000, () => console.log('Server listening on port 5000'));
