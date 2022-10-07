const express = require("express");
const productController = require("../controllers/productController");
const authorize = require("../middlewares/authorize");

let router = express.Router();

router.post("/create_product", authorize(["R1"]), productController.createProduct);

router.put("/:id", authorize(["R1"]), productController.editProduct);

router.delete("/:id", authorize(["R1"]), productController.deleteProduct);

router.get("/", productController.listProduct);

module.exports = router;
