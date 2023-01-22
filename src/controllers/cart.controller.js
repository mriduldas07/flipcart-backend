const Cart = require("../models/cart.schema");

exports.addItemToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((err, cart) => {
    if (err) return res.status(400).json({ err });
    if (cart) {
      const isItemAdded = cart.cartItems.find(
        (c) => c.product == req.body.cartItems.product
      );
      let condition, update;
      if (isItemAdded) {
        condition = {
          user: req.user._id,
          "cartItems.product": req.body.cartItems.product,
        };
        update = {
          $set: {
            "cartItems.$": {
              ...req.body.cartItems,
              quantity: isItemAdded.quantity + req.body.cartItems.quantity,
            },
          },
        };
        Cart.findOneAndUpdate(condition, update).exec((err, _cart) => {
          if (err) return res.status(400).json({ err });
          if (_cart) {
            return res.status(200).json({ _cart });
          }
        });
      } else {
        condition = { user: req.user._id };
        update = {
          $push: {
            cartItems: req.body.cartItems,
          },
        };
        Cart.findOneAndUpdate(condition, update).exec((err, _cart) => {
          if (err) return res.status(400).json({ err });
          if (_cart) {
            return res.status(200).json({ _cart });
          }
        });
      }
    } else {
      const cart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });

      cart.save((err, cart) => {
        if (err) return res.status(400).json({ err });
        if (cart) {
          return res.status(201).json({ cart });
        }
      });
    }
  });
};
