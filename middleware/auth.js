// middleware/auth.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const SECRET_KEY = 'db4b9b4a9bfb56e1ee67e22bf0514a02e8062fca4e81182c6201822bd62e4e1f4324bcee62f8bd45b403dcd000bb0258475cf86fc92c2932594b246b2dbbd659';


const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = await User.findByPk(decoded.id);
    if (!req.user) {
      throw new Error('User not found');
    }
    next();
  } catch (err) {
    res.status(401).send('Invalid token.');
  }
};

module.exports = auth;
