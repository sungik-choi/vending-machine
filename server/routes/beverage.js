const express = require("express");
const router = express.Router();
const data = require("../public/list.json");

router.get("/", function(req, res, next) {
  res.json(data.beverageList);
});

module.exports = router;
