function getScoreForThresholds(value, thresholds) {
  for (const [threshold, score] of thresholds) {
    if (value >= threshold) {
      return score;
    }
  }

  return 0;
}

function calculateScore(user, repos) {
  const repoCount = repos.length;
  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);
  const totalOpenIssues = repos.reduce((acc, repo) => acc + repo.open_issues_count, 0);

  const recentThreshold = new Date();
  recentThreshold.setMonth(recentThreshold.getMonth() - 3);
  const activeRepos = repos.filter(repo => new Date(repo.pushed_at) >= recentThreshold).length;

  const languages = Array.from(new Set(repos.filter(repo => repo.language).map(repo => repo.language)));
  const topRepo = repos.reduce((best, repo) => {
    if (!best || repo.stargazers_count > best.stargazers_count) {
      return repo;
    }

    return best;
  }, null);

  const profileFields = {
    bio: Boolean(user.bio),
    blog: Boolean(user.blog),
    location: Boolean(user.location),
    company: Boolean(user.company),
    email: Boolean(user.email)
  };

  const activityRepoScore = getScoreForThresholds(repoCount, [[20, 15], [10, 10], [5, 5]]);
  const activityRecentScore = getScoreForThresholds(activeRepos, [[3, 10], [1, 5]]);
  const activityScore = activityRepoScore + activityRecentScore;

  const qualityStarScore = getScoreForThresholds(totalStars, [[50, 15], [20, 10], [5, 5]]);
  const qualityForkScore = getScoreForThresholds(totalForks, [[25, 5], [10, 3]]);
  const qualityPopularScore = topRepo?.stargazers_count >= 20 ? 5 : 0;
  const qualityIssueScore = totalOpenIssues === 0 && repoCount > 0 ? 2 : 0;
  const qualityScore = qualityStarScore + qualityForkScore + qualityPopularScore + qualityIssueScore;

  const diversityLanguageScore = getScoreForThresholds(languages.length, [[4, 15], [3, 10], [2, 5]]);
  const diversityCountScore = getScoreForThresholds(repoCount, [[10, 10], [6, 5]]);
  const diversityScore = diversityLanguageScore + diversityCountScore;

  const readinessScore =
    (profileFields.bio ? 5 : 0) +
    (profileFields.blog || profileFields.email ? 5 : 0) +
    (profileFields.location || profileFields.company ? 5 : 0) +
    (repoCount >= 5 ? 5 : 0) +
    (activeRepos >= 1 ? 5 : 0);

  const normalizedActivity = Math.min(activityScore, 25);
  const normalizedQuality = Math.min(qualityScore, 25);
  const normalizedDiversity = Math.min(diversityScore, 25);
  const normalizedReadiness = Math.min(readinessScore, 25);

  return {
    score: normalizedActivity + normalizedQuality + normalizedDiversity + normalizedReadiness,
    breakdown: {
      activity: normalizedActivity,
      codeQuality: normalizedQuality,
      diversity: normalizedDiversity,
      readiness: normalizedReadiness
    },
    details: {
      repoCount,
      totalStars,
      totalForks,
      totalOpenIssues,
      activeRepos,
      languages,
      topRepo: topRepo
        ? {
            name: topRepo.name,
            stars: topRepo.stargazers_count,
            url: topRepo.html_url
          }
        : null,
      profileFields,
      profileComplete: Object.values(profileFields).some(Boolean),
      lastUpdatedAt: repos.length ? repos[0].pushed_at : null
    }
  };
}

module.exports = { calculateScore };
