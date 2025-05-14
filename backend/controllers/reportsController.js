const fs = require("fs");
const path = require("path");
const AnalyticsReport = require("../models/AnalyticsReport");

// Generate Report
const generateReport = async (req, res) => {
  const {
    reportType,
    customReport,
    startDate,
    endDate,
    departmentFilter,
    statusFilter,
    schedule
  } = req.body;

  const reportName = reportType || customReport;
  if (!reportName) {
    return res.status(400).json({ message: 'Report type or custom report name must be provided.' });
  }

  try {
    const report = await AnalyticsReport.findOne({ name: reportName });
    if (!report) {
      return res.status(404).json({ message: 'Report not found.' });
    }

    let filteredData = report.data.filter(item => {
      const itemDate = new Date(item.Date);
      const from = startDate ? new Date(startDate) : null;
      const to = endDate ? new Date(endDate) : null;

      const isInRange = (!from || itemDate >= from) && (!to || itemDate <= to);
      const matchesDept = !departmentFilter || departmentFilter === 'All Departments' || item.Department === departmentFilter;
      const matchesStatus = !statusFilter || statusFilter === 'All Statuses' || item.Status === statusFilter;

      return isInRange && matchesDept && matchesStatus;
    });

    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'No data found for the selected filters.' });
    }

    res.json({
      reportName,
      schedule: schedule || 'None',
      filteredData
    });

  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ message: "Error generating report." });
  }
};

// Download Report
const downloadReport = async (req, res) => {
  const {
    reportType,
    customReport,
    startDate,
    endDate,
    departmentFilter,
    statusFilter
  } = req.body;

  const reportName = reportType || customReport;
  if (!reportName) {
    return res.status(400).json({ message: 'Report type or custom report name must be provided.' });
  }

  try {
    const report = await AnalyticsReport.findOne({ name: reportName });
    if (!report) {
      return res.status(404).json({ message: 'Report not found.' });
    }

    let filteredData = report.data.filter(item => {
      const itemDate = new Date(item.Date);
      const from = startDate ? new Date(startDate) : null;
      const to = endDate ? new Date(endDate) : null;

      const isInRange = (!from || itemDate >= from) && (!to || itemDate <= to);
      const matchesDept = !departmentFilter || departmentFilter === 'All Departments' || item.Department === departmentFilter;
      const matchesStatus = !statusFilter || statusFilter === 'All Statuses' || item.Status === statusFilter;

      return isInRange && matchesDept && matchesStatus;
    });

    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'No data to download for selected filters.' });
    }

    const headers = Object.keys(filteredData[0]).join(',');
    const rows = filteredData.map(row =>
      Object.values(row).map(val => `"${String(val).replace(/"/g, '""')}"`).join(',')
    ).join('\n');

    const csvContent = `${headers}\n${rows}`;
    const fileName = `${reportName.replace(/\s+/g, '_')}_report.csv`;
    const filePath = path.join(__dirname, "..", fileName);

    fs.writeFileSync(filePath, csvContent);

    res.download(filePath, fileName, err => {
      if (err) {
        console.error("Download error:", err);
        res.status(500).send("Error downloading the file.");
      } else {
        fs.unlinkSync(filePath);
      }
    });

  } catch (error) {
    console.error("Error downloading report:", error);
    res.status(500).json({ message: "Error downloading report." });
  }
};

module.exports = {
  generateReport,
  downloadReport,
};
