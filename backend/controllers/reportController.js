// controllers/reportController.js

const Report = require("../models/AuditReport");
const { parse } = require("json2csv");

// Fetch all predefined reports
exports.getPredefinedReports = async (req, res) => {
  try {
    const reports = await Report.find(); // Fetch all predefined reports from DB
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};



// GET /api/download/:reportName?schedule=Daily
exports.generateCSVReport = async (req, res) => {
  const { reportName } = req.params;
  const { schedule } = req.query;


  try {
    const report = await Report.findOne({ name: reportName });

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    let filteredData = report.data;

    // Filter by schedule if provided
    if (schedule && schedule !== "None") {
      filteredData = filteredData.filter((entry) => entry.schedule === schedule);
    }

    if (filteredData.length === 0) {
      return res.status(404).json({ message: "No data found for selected schedule." });
    }
    
    console.log("Generating report for:", reportName, "with schedule:", schedule);


    // Convert filtered data to CSV
    const csv = parse(filteredData);

    res.header("Content-Type", "text/csv");
    res.attachment(`${report.name}_${schedule || "full"}.csv`);
    res.send(csv);
  } catch (err) {
    console.error("CSV generation error:", err);
    res.status(500).json({ message: "Server Error", error: err });
  }
};

