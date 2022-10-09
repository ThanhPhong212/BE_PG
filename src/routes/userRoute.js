const express = require("express");
const userController = require("../controllers/userController");
const authorize = require("../middlewares/authorize");
const validate = require("../validation/validate");
const userValidation = require("../validation/UserValidation");
let router = express.Router();

router.post("/create_user", authorize(["admin"]), validate(userValidation.userRegister), userController.createUser);

router.put("/:id", authorize(["admin"]), userController.editUser);

router.delete("/:id", authorize(["admin"]), userController.deleteUser);

router.get("/:id", userController.getOneUser);

router.get("/", userController.getAllUser);

module.exports = router;
