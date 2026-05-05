const router = require("express").Router();
const User = require("../models/User");

// Create user
router.post("/", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

module.exports = router;
