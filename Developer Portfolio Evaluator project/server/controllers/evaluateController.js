const { calculateScore } = require("../utils/scoring");
const { saveReport, getReport, generateReportId } = require("../utils/reportStore");
const axios = require("axios");

exports.evaluateProfile = async (req, res) => {
  console.log('Received evaluation request for username:', req.body.username);
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    const githubHeaders = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Developer-Portfolio-Evaluator"
    };

    console.log('Fetching user data for:', username);
    const userRes = await axios.get(`https://api.github.com/users/${username}`, { headers: githubHeaders });
    console.log('Fetched user data');
    const repoRes = await axios.get(`https://api.github.com/users/${username}/repos?per_page=10&sort=updated&type=owner`, { headers: githubHeaders });
    console.log('Fetched repos data');

    const user = userRes.data;
    const repos = repoRes.data;

    const result = calculateScore(user, repos);
    console.log('Score calculated');
    const reportId = generateReportId();
    const clientOrigin = req.get("origin") || `${req.protocol}://${req.get("host")}`;
    const shareableLink = `${clientOrigin}/?report=${reportId}`;
    const apiLink = `${req.protocol}://${req.get("host")}/api/report/${reportId}`;

    const report = {
      id: reportId,
      username,
      score: result.score,
      breakdown: result.breakdown,
      details: result.details,
      createdAt: new Date().toISOString(),
      shareableLink,
      apiLink
    };

    try {
      await saveReport(report);
      console.log('Report saved');
    } catch (saveError) {
      console.error('Failed to save report:', saveError.message);
    }

    res.json(report);
  } catch (error) {
    console.error('Error evaluating profile:', error.response?.data || error.message);
    console.error(error.stack);
    if (error.response?.status === 404) {
      return res.status(404).json({ message: "User not found" });
    }

    const errorMessage = error.response?.data?.message || error.message || "Unable to evaluate profile";
    res.status(500).json({ message: errorMessage });
  }
};

exports.getReportById = async (req, res) => {
  const { id } = req.params;
  const report = await getReport(id);

  if (!report) {
    return res.status(404).json({ message: "Report not found" });
  }

  res.json(report);
};

