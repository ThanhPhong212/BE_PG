const express = require("express");
const productController = require("../controllers/productController");
const authorize = require("../middlewares/authorize");
const validate = require("../validation/validate");
const productValidation = require("../validation/productValidation");

let router = express.Router();

router.post(
  "/create_product",
  authorize(["admin"]),
  validate(productValidation.product),
  productController.createProduct
);

router.put("/:id", authorize(["admin"]), productController.editProduct);

router.delete("/:id", authorize(["admin"]), productController.deleteProduct);

router.get("/searchProduct", productController.searchProduct);

router.get("/", productController.listProduct);

module.exports = router;
