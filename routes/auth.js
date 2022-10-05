const express = require("express");
const authController = require("../controllers/authController");

let router = express.Router();
router.post("/login", authController.login);

// router.get("/logout", authController.userLoout);

module.exports = router;
