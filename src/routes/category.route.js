const express = require("express");
const {
  addCategory,
  getCategory,
} = require("../controllers/category.controller");
const {
  requireSignin,
  adminMiddleware,
} = require("../middleware/index.middleware");
const router = express.Router();

router.post("/category/create", requireSignin, adminMiddleware, addCategory);
router.get("/category/getCategory", getCategory);

module.exports = router;
