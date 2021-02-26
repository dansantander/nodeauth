const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access denied');
  
  try {
    const verified = jwt.verify(token, process.env.SECRET);
    // We set user in the request with the value returned
    // from the verification, which contains the id
    req.user = verified;
    next();
  } catch (err) {
      return res.status(401).send('Invalid token');
  } 
}
