import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

function App() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shareLink, setShareLink] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reportId = params.get("report");

    if (reportId) {
      loadReport(reportId);
    }
  }, []);

  const loadReport = async (id) => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(`${API_BASE}/report/${id}`);
      setResult(res.data);
      setShareLink(res.data.shareableLink || `${window.location.origin}/?report=${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load report");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!username.trim()) {
      setError("Please enter a GitHub username.");
      return;
    }

    setLoading(true);
    setError("");
    console.log('Sending request for username:', username.trim());

    try {
      const res = await axios.post(`${API_BASE}/evaluate`, { username: username.trim() });
      console.log('Received response:', res.data);
      setResult(res.data);
      setShareLink(res.data.shareableLink);
      window.history.replaceState({}, "", `?report=${res.data.id}`);
    } catch (err) {
      console.error('Error:', err);
      console.error('Error response:', err.response?.status, err.response?.data);
      setError(err.response?.data?.message || "Unable to evaluate profile.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const copyLink = async () => {
    if (!shareLink) return;

    try {
      await navigator.clipboard.writeText(shareLink);
      alert("Shareable link copied to clipboard.");
    } catch {
      alert("Unable to copy link. Please copy it manually.");
    }
  };

  return (
    <div style={{ maxWidth: 740, margin: "40px auto", padding: "0 20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Developer Portfolio Evaluator</h1>
      <p style={{ textAlign: "center", color: "#555" }}>
        Enter a GitHub username to generate a detailed evaluation covering activity, code quality, project diversity, and hiring readiness.
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Enter GitHub Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: 10, width: 260, borderRadius: 6, border: "1px solid #ccc" }}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ padding: "10px 18px", borderRadius: 6, border: "none", background: "#0070f3", color: "white", cursor: "pointer" }}
        >
          {loading ? "Evaluating..." : "Evaluate"}
        </button>
      </div>

      {error && <p style={{ color: "#d32f2f", textAlign: "center" }}>{error}</p>}

      {result && (
        <div style={{ background: "#f8f9fb", borderRadius: 12, padding: 24, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
          <h2 style={{ marginTop: 0 }}>Scorecard for {result.username}</h2>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 220px", minWidth: 220, padding: 18, background: "white", borderRadius: 10, border: "1px solid #e3e6ea" }}>
              <h3 style={{ marginTop: 0 }}>Overall Score</h3>
              <p style={{ fontSize: 42, margin: 0, color: "#111" }}>{result.score}</p>
            </div>
            <div style={{ flex: "2 1 420px", minWidth: 240, padding: 18, background: "white", borderRadius: 10, border: "1px solid #e3e6ea" }}>
              <h3 style={{ marginTop: 0 }}>Breakdown</h3>
              <ul style={{ paddingLeft: 20, margin: 0, color: "#333" }}>
                <li>Activity: {result.breakdown.activity}/25</li>
                <li>Code Quality: {result.breakdown.codeQuality}/25</li>
                <li>Diversity: {result.breakdown.diversity}/25</li>
                <li>Readiness: {result.breakdown.readiness}/25</li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            <div style={{ background: "white", padding: 18, borderRadius: 10, border: "1px solid #e3e6ea" }}>
              <strong>Repositories</strong>
              <p style={{ margin: "8px 0 0" }}>{result.details.repoCount}</p>
            </div>
            <div style={{ background: "white", padding: 18, borderRadius: 10, border: "1px solid #e3e6ea" }}>
              <strong>Total Stars</strong>
              <p style={{ margin: "8px 0 0" }}>{result.details.totalStars}</p>
            </div>
            <div style={{ background: "white", padding: 18, borderRadius: 10, border: "1px solid #e3e6ea" }}>
              <strong>Total Forks</strong>
              <p style={{ margin: "8px 0 0" }}>{result.details.totalForks}</p>
            </div>
            <div style={{ background: "white", padding: 18, borderRadius: 10, border: "1px solid #e3e6ea" }}>
              <strong>Active repos (last 3 mo.)</strong>
              <p style={{ margin: "8px 0 0" }}>{result.details.activeRepos}</p>
            </div>
          </div>

          <div style={{ marginTop: 24, background: "white", padding: 18, borderRadius: 10, border: "1px solid #e3e6ea" }}>
            <h3 style={{ marginTop: 0 }}>Profile & project details</h3>
            <p style={{ margin: 6 }}><strong>Languages:</strong> {result.details.languages.length ? result.details.languages.join(", ") : "Not available"}</p>
            <p style={{ margin: 6 }}><strong>Top repo:</strong> {result.details.topRepo ? <a href={result.details.topRepo.url} target="_blank" rel="noreferrer">{result.details.topRepo.name}</a> : "No repos found"}</p>
            <p style={{ margin: 6 }}><strong>Last updated:</strong> {result.details.lastUpdatedAt ? new Date(result.details.lastUpdatedAt).toLocaleDateString() : "N/A"}</p>
            <p style={{ margin: 6 }}><strong>Profile completeness:</strong> {result.details.profileComplete ? "Good" : "Missing bio or contact details"}</p>
          </div>

          {shareLink && (
            <div style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <input
                readOnly
                value={shareLink}
                style={{ flex: 1, minWidth: 180, padding: 12, borderRadius: 8, border: "1px solid #ccc" }}
              />
              <button
                onClick={copyLink}
                style={{ padding: "12px 18px", borderRadius: 8, border: "none", background: "#0070f3", color: "white", cursor: "pointer" }}
              >
                Copy shareable link
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
