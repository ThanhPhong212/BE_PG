const express = require("express");
const categoryController = require("../controllers/categoryController");
const authorize = require("../middlewares/authorize");
const validate = require("../validation/validate");
// const userValidation = require("../validation/UserValidation");

let router = express.Router();

router.post(
  "/create_category",
  authorize(["admin"]),
  categoryController.createCategory
);

router.put("/:id", authorize(["admin"]), categoryController.editCategory);

router.delete("/:id", authorize(["admin"]), categoryController.deleteCategory);

router.get("/", categoryController.getCategory);

module.exports = router;
