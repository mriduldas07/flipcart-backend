const express = require("express");
const { signup, signin } = require("../controllers/auth.controller");
const router = express.Router();
const { check } = require("express-validator");
const {
  isRequestValidated,
  validateSignUpRequest,
  validateSignInRequest,
} = require("../validators/auth.validate");

//signup
router.post("/signup", validateSignUpRequest, isRequestValidated, signup);

// signin
router.post("/signin", validateSignInRequest, isRequestValidated, signin);

module.exports = router;
