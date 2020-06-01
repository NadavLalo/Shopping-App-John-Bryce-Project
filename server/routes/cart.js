const express = require("express");
const router = express.Router();

const CartController = require("../Controllers/CartController");

const verifyToken = require("../middleware/verifyToken")

router.get("/", verifyToken, CartController.getCart);

router.post("/", verifyToken, CartController.addProductToCart);

router.delete(
  "/",
  verifyToken,
  CartController.removeProductFromCart
);

module.exports = router;