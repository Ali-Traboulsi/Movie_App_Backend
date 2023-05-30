const { validate } = require('express-validation');
const express = require("express");

const router = express.Router();

// import relative dependencies
const authController = require('../controllers/auth.controller');
const authValidationRules = require('../validations/auth.validation');

// define Routes


// /sign-up => POST ---- for registering a user
router.post('/sign-up', validate(authValidationRules), authController.signUp);

// /sign-in => POST ---- for logging a user in
router.post('/sign-in', authController.signIn);

// /send-pass-reset => POST ---- for sending a reset token
router.post('/send-pass-reset', authController.sendPassResetLink);

// /validate-token => GET ---- for logging a user in
router.get('/reset-pass/:resetToken', authController.validateResetToken);

// /reset-pass => PUT ---- for updating user password
router.put('/reset-pass/:resetToken', authController.resetPass);

module.exports = router;
