const express = require("express");
const userController = require("../controllers/userController");
const authorize = require("../middlewares/authorize");
let router = express.Router();

router.post("/create_user", authorize(["R1"]), userController.createUser);

router.put("/:id", authorize(["R1"]), userController.editUser);

router.delete("/:id", authorize(["R1"]), userController.deleteUser);

router.get("/:id", authorize(["R1", "R2"]), userController.getOneUser);

router.get("/", authorize(["R1"]), userController.getAllUser);

module.exports = router;
