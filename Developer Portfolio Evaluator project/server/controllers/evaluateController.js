const axios = require("axios");

exports.evaluateProfile = async (req, res) => {
  const { username } = req.body;

  try {
    const userRes = await axios.get(`https://api.github.com/users/${username}`);
    const repoRes = await axios.get(`https://api.github.com/users/${username}/repos`);

    const user = userRes.data;
    const repos = repoRes.data;

    const score = calculateScore(user, repos);

    res.json({
      username,
      score,
      repoCount: repos.length
    });

  } catch (error) {
    res.status(400).json({ message: "User not found" });
  }
};
