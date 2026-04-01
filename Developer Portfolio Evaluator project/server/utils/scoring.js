function calculateScore(user, repos) {
let score = 0;

// Activity
if (repos.length > 10) score += 20;
if (repos.length > 20) score += 10;

// Stars
let totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
if (totalStars > 50) score += 20;

// Diversity
let languages = new Set(repos.map(r => r.language));
if (languages.size > 3) score += 20;

// Profile completeness
if (user.bio) score += 10;
if (user.avatar_url) score += 10;

return score;
}

module.exports = { calculateScore };
