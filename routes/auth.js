const express = require('express');
const router = express.Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

router.post('/login', async (req, res, next) => {

  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check user existence by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("No registered email");
  
  // Check password match
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("No valid password");

  // Create and assign Token
  const token = jwt.sign({id: user._id}, process.env.SECRET );
  res.header('auth-token', token).send(token);

  res.send('Logged In');
});

module.exports = router;