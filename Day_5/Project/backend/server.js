const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

/* EXISTING FEATURE – DO NOT CHANGE */
app.get("/api/message", (req, res) => {
  res.json({
    message: "Hello from Node.js and Express Backend"
  });
});

/* NEW FEATURE – GET METHOD */
app.get("/api/users", (req, res) => {
  res.json({
    message: "GET request successful",
    users: ["Alice", "Bob", "Charlie"]
  });
});

/* NEW FEATURE – POST METHOD */
app.post("/api/users", (req, res) => {
  const newUser = req.body.name;

  res.json({
    message: "POST request successful",
    addedUser: newUser
  });
});

/* NEW FEATURE – DELETE METHOD */
app.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;

  res.json({
    message: "DELETE request successful",
    deletedUserId: userId
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
