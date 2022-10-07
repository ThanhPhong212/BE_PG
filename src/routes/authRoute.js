const express = require("express");
const authController = require("../controllers/authController");
const validate = require("../validation/validate");
const userValidation = require("../validation/userValidation");

let router = express.Router();
router.post("/login", authController.login);
router.post("/register", validate(userValidation.user), authController.register);

module.exports = router;
