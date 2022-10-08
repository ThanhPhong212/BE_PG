const express = require("express");
const allCodeController = require("../controllers/allCodeController");
const authorize = require("../middlewares/authorize");
const validate = require("../validation/validate");
const allcodeValidation = require("../validation/allcodeValidation");

let router = express.Router();

router.post(
  "/create_code",
  // authorize(["R1"]),
  validate(allcodeValidation.allcode),
  allCodeController.createAllCode
);

router.put(
  "/:id",
  authorize(["R1"]),
  validate(allcodeValidation.allcode),
  allCodeController.editAllCode
);

router.delete("/:id", authorize(["R1"]), allCodeController.deleteAllCode);

router.get("/getType", authorize(["R1"]), allCodeController.getType);

module.exports = router;
