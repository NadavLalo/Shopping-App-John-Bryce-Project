const express = require("express");
const router = express.Router();
const OrderController = require("../Controllers/OrderController");

const verifyToken = require("../middleware/verifyToken")

router.get("/", OrderController.getAllOrders);

router.post("/", verifyToken, OrderController.orderCart);

module.exports = router;