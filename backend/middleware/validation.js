
const { body, param, validationResult } = require('express-validator');


const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array().map(err => ({
        field: err.path || err.param,
        message: err.msg,
        value: err.value
      }))
    });
  }
  next();
};


const validateRegistration = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  handleValidationErrors
];


const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];


const validateSessionId = [
  param('sessionId')
    .notEmpty()
    .withMessage('Session ID is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Session ID must be between 1 and 100 characters'),
  handleValidationErrors
];


const validateReportRequest = [
  body('session_id')
    .notEmpty()
    .withMessage('Session ID is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Session ID must be between 1 and 100 characters'),
  handleValidationErrors
];



module.exports ={
    validateLogin,
    validateRegistration,
    validateReportRequest,
    validateLogin,
    validateSessionId,
    handleValidationErrors
}