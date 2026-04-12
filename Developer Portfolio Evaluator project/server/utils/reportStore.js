const fs = require("fs").promises;
const path = require("path");

const reportsPath = path.join(__dirname, "..", "data", "reports.json");

async function ensureReportsFile() {
  try {
    await fs.access(reportsPath);
  } catch (error) {
    await fs.mkdir(path.dirname(reportsPath), { recursive: true });
    await fs.writeFile(reportsPath, "[]", "utf8");
  }
}

async function readReports() {
  await ensureReportsFile();
  const data = await fs.readFile(reportsPath, "utf8");
  return JSON.parse(data || "[]");
}

async function saveReport(report) {
  const reports = await readReports();
  const index = reports.findIndex((item) => item.id === report.id);

  if (index >= 0) {
    reports[index] = report;
  } else {
    reports.push(report);
  }

  await fs.writeFile(reportsPath, JSON.stringify(reports, null, 2), "utf8");
  return report;
}

async function getReport(id) {
  const reports = await readReports();
  return reports.find((item) => item.id === id);
}

function generateReportId() {
  return Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
}

module.exports = { saveReport, getReport, generateReportId };
