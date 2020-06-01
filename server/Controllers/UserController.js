const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

class UserController {
  static login(req, res) {
    const { email, password } = req.body;
    User.findOne({ email, password }).then(user => {
      if (user) {
        const accessToken = jwt.sign(
          { user: user._id, role: user.role },
          "mySecret"
        );
        res.send({
          firstname: user.firstname,
          role: user.role,
          _id: user._id,
          street: user.street,
          city: user.city,
          accessToken
        });
      } else {
        return res.sendStatus(401);
      }
    });
  }

  static async stepOneSignUp(req, res) {
    console.log(req.body);
    const { _id, email } = req.body;
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ errors: validationErrors.array() });
    } else {
      const errors = [];
      await User.find({ _id }).then(user => {
        if (user.length > 0) {
          errors.push({ _id: "unavailable" });
        }
      });
      await User.find({ email }).then(user => {
        if (user.length > 0) {
          errors.push({ email: "unavailable" });
        }
      });
      if (Object.keys(errors).length > 0) {
        return res.status(422).json({ errors });
      } else {
        return res.status(200).json("success");
      }
    }
  }

  static finalSignUp(req, res) {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ errors: validationErrors.array() });
    } else {
      const newUser = new User(req.body);
      newUser.save().then(user => {
        const accessToken = jwt.sign(
          { user: user._id, role: user.role },
          "mySecret"
        );
        res.send({
          firstname: user.firstname,
          role: user.role,
          _id: user._id,
          street: user.street,
          city: user.city,
          accessToken
        });
      });
    }
  }

  static authenticate(req, res) {
    const token = req.headers.token;
    jwt.verify(token, "mySecret", (err, decoded) => {
      if (decoded !== undefined) {
        User.findOne({ _id: decoded.user }).then(user => {
          res.send({
            firstname: user.firstname,
            role: user.role,
            _id: user._id,
            street: user.street,
            city: user.city
          });
        });
      } else {
        return res.status(401).json({ tokenError: true });
      }
    });
  }
}

module.exports = UserController;
