const express = require("express");
const router = express.Router();
const { evaluateProfile, getReportById } = require("../controllers/evaluateController");

router.post("/evaluate", evaluateProfile);
router.get("/report/:id", getReportById);

module.exports = router;
