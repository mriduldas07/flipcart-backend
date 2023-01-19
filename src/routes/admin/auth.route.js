const express = require("express");
const { signup, signin } = require("../../controllers/admin/auth.controller");
const {
  validateSignUpRequest,
  isRequestValidated,
  validateSignInRequest,
} = require("../../validators/auth.validate");
const router = express.Router();

//signup
router.post("/admin/signup", validateSignUpRequest, isRequestValidated, signup);

// signin
router.post("/admin/signin", validateSignInRequest, isRequestValidated, signin);

module.exports = router;
