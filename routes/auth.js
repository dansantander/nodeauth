const express = require('express');
const router = express.Router();
const User = require('../model/User');
const { registerValidation } = require('../validation');

router.post('/register', async (req, res, next) => {

  // Data validation
  // const validation = schema.validate(req.body);
  // This returns an object, so we can destructure it
  // so that we only get the error messages:
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  // User creation
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch(err) {
    res.status(400).send(err);
  }
});

module.exports = router;