const { check, validationResult } = require('express-validator');


const validateResult = [
  check('email', 'Invalid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }
    next();
  }
];

module.exports = validateResult;
