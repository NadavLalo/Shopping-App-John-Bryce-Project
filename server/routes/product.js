const express = require("express");
const router = express.Router();
const ProductController = require("../Controllers/ProductController");
const verifyAdminToken = require("../middleware/verifyAdminToken");
const { check } = require("express-validator");

router.get("/categories", ProductController.getCategories);

router.get("/search", ProductController.searchProduct);

router.get("/:_id", ProductController.getProductsByCategory);

router.get("/", ProductController.getAllProducts);

router.post(
  "/",
  verifyAdminToken,
  check("name")
    .notEmpty()
    .isString(),
  check("category")
    .notEmpty()
    .isString(),
  check("price")
    .notEmpty()
    .isNumeric(),
  ProductController.addProduct
);

router.put(
  "/:_id",
  check("name")
    .notEmpty()
    .isString(),
  check("category")
    .notEmpty()
    .isString(),
  check("price")
    .notEmpty()
    .isNumeric(),
  verifyAdminToken,
  ProductController.editProduct
);

router.delete("/:_id", verifyAdminToken, ProductController.deleteProduct);

module.exports = router;
