const express = require('express');
const app = express();
const mongoose = require('mongoose');
var logger = require('morgan');

require('dotenv').config();

// Import routes
const authRoute = require('./routes/auth');

// Set up Mongoose connection
mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true , useUnifiedTopology: true}
);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware
app.use(logger('dev'));
app.use(express.json());

//Route middlewares
app.use('/api/user', authRoute);

app.listen(3000, ()=> {
  console.log('Server running on port 3000')
});