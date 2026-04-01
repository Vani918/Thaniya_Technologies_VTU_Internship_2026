const axios = require("axios");
const { calculateScore } = require("../utils/scoring");

exports.evaluateProfile = async (req, res) => {
  const { username } = req.body;

  try {
    // Debug log
    console.log("Username received:", username);

    // Clean username (removes spaces)
    const cleanUsername = username.trim();

    // GitHub API calls
    const userRes = await axios.get(
      `https://api.github.com/users/${cleanUsername}`
    );

    const repoRes = await axios.get(
      `https://api.github.com/users/${cleanUsername}/repos`
    );

    console.log("GitHub API success");

    const user = userRes.data;
    const repos = repoRes.data;

    // Calculate score
    const score = calculateScore(user, repos);

    // Send response
    res.json({
      username: cleanUsername,
      score,
      repoCount: repos.length,
    });

  } catch (error) {
    // Detailed error logging
    console.log("ERROR:", error.message);

    res.status(400).json({
      message: "User not found or API error",
    });
  }
};
