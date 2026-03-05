const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/api/message", (req, res) => {
  res.json({
    message: "Hello from Node.js and Express Backend"
  });
});

/*  GET METHOD */
app.get("/api/users", (req, res) => {
  res.json({
    message: "GET request successful",
    users: ["Alice", "Bob", "Charlie"]
  });
});

/*  POST METHOD */
app.post("/api/users", (req, res) => {
  const newUser = req.body.name;

  res.json({
    message: "POST request successful",
    addedUser: newUser
  });
});

/* DELETE METHOD */
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
