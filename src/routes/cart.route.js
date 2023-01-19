const express = require("express");
const { addItemToCart } = require("../controllers/cart.controller");
const {
  requireSignin,
  userMiddleware,
} = require("../middleware/index.middleware");
const router = express.Router();

router.post(
  "/user/cart/addtocart",
  requireSignin,
  userMiddleware,
  addItemToCart
);

module.exports = router;
