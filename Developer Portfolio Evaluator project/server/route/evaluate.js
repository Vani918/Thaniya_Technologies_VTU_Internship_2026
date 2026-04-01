const express = require("express");
const router = express.Router();
const { evaluateProfile } = require("../controllers/evaluateController");

router.post("/evaluate", (req, res, next) => {
  console.log("Route hit!");
  next();
}, evaluateProfile);


module.exports = router;
