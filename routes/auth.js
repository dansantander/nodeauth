const express = require('express');
const router = express.Router();
const User = require('../model/User');
const { registerValidation } = require('../validation');
const bcrypt = require('bcryptjs')

router.post('/register', async (req, res, next) => {

  // const validation = schema.validate(req.body) returns an object
  // so we can destructure it so that we only get the error messages:
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check email uniqueness
  const emailExistence = await User.findOne({ email: req.body.email });
  if (emailExistence) return res.status(400).send("Email already exists");

  // Generate salt for the password
  // Remember: 10 is the level of complexity of the hashing
  const salt = await bcrypt.genSalt(10);
  // Generate password hash
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
  // User creation
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  })

  try {
    const savedUser = await user.save();
    // We don't wanna send back the whole user object
    // which contains all the user data:
    // res.send(savedUser);
    // so we just send back the user id:
    res.send({
      user: user._id
    })
  } catch(err) {
    res.status(400).send(err);
  }
});

module.exports = router;