const express = require("express");
const { createProduct } = require("../controllers/product.controller");
const {
  requireSignin,
  adminMiddleware,
} = require("../middleware/index.middleware");
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
router.post(
  "/product/create",
  requireSignin,
  adminMiddleware,
  upload.array("productPicture"),
  createProduct
);

// router.get("/category/getCategory", getCategory);

module.exports = router;