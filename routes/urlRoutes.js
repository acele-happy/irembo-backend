const express = require("express");
const router = express.Router();
const {
  shorten,
  redirect,
  getUrlsByUserId,
} = require("../controllers/urlController");

router.post("/url/shorten/:id", shorten);
router.post("/url/redirect/:alias", redirect);
router.get("/url/getUrlByUserId/:id", getUrlsByUserId);

module.exports = router;
