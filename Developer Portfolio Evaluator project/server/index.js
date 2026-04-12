const express = require("express");
const cors = require("cors");
const evaluateRoute = require("./route/evaluate");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api", evaluateRoute);

app.get("/test", (req, res) => {
  res.json({ message: "Server is running" });
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

console.log("Server setup complete");
