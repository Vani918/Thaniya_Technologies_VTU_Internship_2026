const express = require("express");
const router = express.Router();
const { evaluateProfile } = require("../controllers/evaluateController");

router.post("/evaluate", evaluateProfile);

module.exports = router;
