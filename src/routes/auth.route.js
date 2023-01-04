const express = require("express");
const { signup, signin } = require("../controllers/auth.controller");
const router = express.Router();

//signup
router.post("/signup", signup);

// signin
router.post("/signin", signin);

module.exports = router;
