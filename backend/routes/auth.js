// backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const { findUserByEmail, createUser } = require('../data/users');
const { generateToken, authenticateToken } = require('../middleware/auth');
// const { validateRegistration, validateLogin } = require('../middleware/validation');
const{validateRegistration , validateLogin} = require('../middleware/validation');
// console.log(validateLogin,validateRegistration)
// // POST /api/auth/register
router.post('/register', validateRegistration, async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        error: 'User already exists',
        message: 'A user with this email address already exists'
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = createUser({
      email,
      password: hashedPassword,
      name
    });

    // Generate token
    const token = generateToken(newUser);

    // Remove password from response
    const { password: _, ...userResponse } = newUser;

    res.status(201).json({
      message: 'User registered successfully',
      user: userResponse,
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      error: 'Registration failed',
      message: 'An error occurred during registration'
    });
  }
});

// POST /api/auth/login
router.post('/login', validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Email or password is incorrect'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Email or password is incorrect'
      });
    }

    // Generate token
    const token = generateToken(user);

    // Remove password from response
    const { password: _, ...userResponse } = user;

    res.json({
      message: 'Login successful',
      user: userResponse,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Login failed',
      message: 'An error occurred during login'
    });
  }
});

// GET /api/auth/profile
router.get('/profile', authenticateToken, (req, res) => {
  res.json({
    message: 'Profile retrieved successfully',
    user: req.user
  });
});

// POST /api/auth/verify
router.post('/verify', authenticateToken, (req, res) => {
  res.json({
    message: 'Token is valid',
    user: req.user
  });
});


module.exports = router;