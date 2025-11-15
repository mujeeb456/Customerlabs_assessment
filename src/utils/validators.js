const { body, header } = require('express-validator');

exports.signupValidator = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
];

exports.incomingValidator = [
  header('CL-X-TOKEN').notEmpty(),
  header('CL-X-EVENT-ID').notEmpty()
];