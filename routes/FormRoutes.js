const express = require("express");
const router = express.Router();
const { sendPayload } = require("../controllers/formController");

router.post("/sendEmail", sendPayload);

module.exports = router;
