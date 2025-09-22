
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const { findUserByEmail, createUser } = require('../data/users');
const { generateToken, authenticateToken } = require('../middleware/auth');

const{validateRegistration , validateLogin} = require('../middleware/validation');

router.post('/register', validateRegistration, async (req, res) => {
  try {
    const { email, password, name } = req.body;


    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        error: 'User already exists',
        message: 'A user with this email address already exists'
      });
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

   
    const newUser = createUser({
      email,
      password: hashedPassword,
      name
    });

    const token = generateToken(newUser);

   
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


router.post('/login', validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Email or password is incorrect'
      });
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Email or password is incorrect'
      });
    }

 
    const token = generateToken(user);

   
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

router.get('/profile', authenticateToken, (req, res) => {
  res.json({
    message: 'Profile retrieved successfully',
    user: req.user
  });
});


router.post('/verify', authenticateToken, (req, res) => {
  res.json({
    message: 'Token is valid',
    user: req.user
  });
});


module.exports = router;