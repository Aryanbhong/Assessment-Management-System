
const jwt = require('jsonwebtoken');
const { findUserById } = require('../data/users');

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      error: 'Access denied',
      message: 'No token provided'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        error: 'Invalid token',
        message: 'Token is expired or invalid'
      });
    }


    const existingUser = findUserById(user.id);
    if (!existingUser) {
      return res.status(403).json({ 
        error: 'User not found',
        message: 'User associated with token no longer exists'
      });
    }

    req.user = user;
    next();
  });
};

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name
  };

  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  });
};


module.exports={
    authenticateToken,
    generateToken,
    JWT_SECRET
}