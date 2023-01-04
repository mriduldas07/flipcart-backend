const User = require("../models/user.schema");
const jwt = require("jsonwebtoken");

module.exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).json("User already registered");
    }

    const { firstName, lastName, email, password } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      userName: Math.random().toString(),
    });

    _user.save((err, data) => {
      if (err) {
        return res.status(400).json({
          message: "Something Went Wrong",
        });
      }

      if (data) {
        return res.status(201).json({
          message: "User Created Successfully",
        });
      }
    });
  });
};

module.exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) return res.status(400).json({ err });
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
          expiresIn: "1h",
        });
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      } else {
        return res.status(400).json({ message: "Invalid Password" });
      }
    } else {
      return res.status(400).json({ message: "SomeThing went wrong!!" });
    }
  });
};

module.exports.requireSignin = (req, res, next) => {
  const token = req.headers.authorization.split(" ").trim();
  const user = jwt.verify(token, process.env.JWT_KEY);
  req.user = user;
  next();
};
