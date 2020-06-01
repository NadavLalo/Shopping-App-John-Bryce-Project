const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserController");
const { check, validationResult } = require("express-validator");

router.post("/auth", UserController.authenticate);

router.post("/login", UserController.login);

router.post(
  "/steponesignup",
  check("_id").notEmpty(),
  check("email").notEmpty(),
  check("password").notEmpty(),
  check("confirmPassword").notEmpty(),
  UserController.stepOneSignUp
);

router.post(
  "/finalsignup",
  check("city").notEmpty(),
  check("street").notEmpty(),
  check("firstname").notEmpty(),
  check("lastname").notEmpty(),
  UserController.finalSignUp
);

module.exports = router;
