const express = require("express");
const authController = require("../controllers/authController");
const validate = require("../validation/validate");
const { userLogin, userRegister } = require("../validation/userValidation");

let router = express.Router();
router.post("/login", validate(userLogin), authController.login);
router.post("/register", validate(userRegister), authController.register);

module.exports = router;
