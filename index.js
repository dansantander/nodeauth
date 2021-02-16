const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

// Set up Mongoose connection
mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true , useUnifiedTopology: true},
  () => { console.log('Database connected')}
)

// Import routes
const authRoute = require('./routes/auth');

//Route middlewares
app.use('/api/user', authRoute);

app.listen(3000, ()=> {
  console.log('Server running on port 3000')
});