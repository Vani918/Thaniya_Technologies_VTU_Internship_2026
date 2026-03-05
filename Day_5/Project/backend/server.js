const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/api/message", (req, res) => {
  res.json({
    message: "Hello from Node.js and Express Backend"
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
