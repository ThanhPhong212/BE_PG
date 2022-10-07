const express = require("express");
const allCodeController = require("../controllers/allCodeController");
const authorize = require("../middlewares/authorize");

let router = express.Router();

router.post("/create_code", authorize(["R1"]), allCodeController.createAllCode);

router.put("/:id", authorize(["R1"]), allCodeController.editAllCode);

router.delete("/:id", authorize(["R1"]), allCodeController.deleteAllCode);

router.get("/getType", authorize(["R1"]), allCodeController.getType);

module.exports = router;
