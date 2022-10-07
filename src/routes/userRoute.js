const express = require("express");
const userController = require("../controllers/userController");
const authorize = require("../middlewares/authorize");
const validate = require("../validation/validate");
const userValidation = require("../validation/UserValidation");
let router = express.Router();

router.post(
  "/create_user",
  authorize(["R1"]),
  validate(userValidation.user),
  userController.createUser
);

router.put("/:id", authorize(["R1"]), validate(userValidation.user), userController.editUser);

router.delete("/:id", authorize(["R1"]), userController.deleteUser);

router.get("/:id", authorize(["R1", "R2"]), userController.getOneUser);

router.get("/", authorize(["R1"]), userController.getAllUser);

module.exports = router;
