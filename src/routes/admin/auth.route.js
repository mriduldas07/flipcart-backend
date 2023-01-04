const express = require("express");
const { signup, signin } = require("../../controllers/admin/auth.controller");
const router = express.Router();

//signup
router.post("/admin/signup", signup);

// signin
router.post("/admin/signin", signin);

module.exports = router;
