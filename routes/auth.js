const express = require('express');
const router = express.Router();

router.post('/register', (req, res, next) => {
  res.send('Registered')
})

router.post('/login', (req, res, next) => {
  res.send('Logged In')
})

module.exports = router;