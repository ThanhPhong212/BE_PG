const express = require("express");
const userController = require("../controllers/userController");
const middlewareController = require("../controllers/middlewareController");

let router = express.Router();

router.post("/create_user", userController.createUser);
router.put("/:id", userController.editUser);
router.delete("/:id", middlewareController.verifyTokenAdmin, userController.deleteUser);
router.get("/:id", userController.getOneUser);
router.get("/", userController.getAllUser);

module.exports = router;
