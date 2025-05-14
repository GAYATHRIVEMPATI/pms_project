import React, { useState } from "react";

const AuditReports = () => {
  // Predefined Reports Data (for selection purposes)
  const predefinedReports = [
    { id: 1, name: "Financial Report", description: "Procurement exceeding a specific value." },
    { id: 2, name: "Vendor Diversity Report", description: "Percentage of contracts with small businesses." },
    { id: 3, name: "Environmental Impact Report", description: "Recycled materials usage percentage." },
  ];

  // State for selected report type and other form elements
  const [selectedReport, setSelectedReport] = useState("");
  const [customReport, setCustomReport] = useState("");
  const [schedule, setSchedule] = useState("None");
  const [reportOutput, setReportOutput] = useState("");

  // Handle report selection from dropdown
  const handleReportSelection = (e) => {
    setSelectedReport(e.target.value);
  };

  // Generate Report logic (this may also send a request to your backend to filter/generate the report)
  const generateReport = () => {
    if (!selectedReport && !customReport) {
      setReportOutput("Please select or enter a report type.");
      return;
    }

    let reportMessage = `Generating ${selectedReport || customReport} Report...`;
    if (schedule !== "None") {
      reportMessage += ` This report is scheduled to run ${schedule}.`;
    }

    setReportOutput(reportMessage);

    // Optionally, you may call an API endpoint here to trigger report generation based on filters.

    // Reset the fields after generating the report if desired
    // setSelectedReport("");
    // setCustomReport("");
    // setSchedule("None");
  };

  // Download the report by fetching the CSV from your backend API
  const downloadReport = () => {
    const reportToDownload = selectedReport || customReport;
  
    if (!reportToDownload) {
      setReportOutput("Please select a predefined or custom report to download.");
      return;
    }
  
    fetch(`http://localhost:5000/api/download/${encodeURIComponent(selectedReport)}?schedule=${schedule}`, {

      method: "GET",
      headers: {
        Accept: "text/csv",
      },
    })
    
      .then((response) => {
        if (!response.ok) {
          throw new Error("Download failed");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${reportToDownload}_${schedule}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setReportOutput(`Downloading ${reportToDownload} (${schedule}) Report...`);
      })
      .catch((error) => {
        console.error("Error downloading CSV:", error);
        setReportOutput("Error downloading report.");
      });
  };
  
  

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Regulatory Reporting</h1>

     

      <h3 style={styles.subTitle}>Report Generation</h3>
      <div style={styles.form}>
        {/* Predefined Reports Dropdown */}
        <label>Select Predefined Report:</label>
        <select name="reportType" value={selectedReport} onChange={handleReportSelection} style={styles.input}>
          <option value="">Select Report</option>
          {predefinedReports.map((report) => (
            <option key={report.id} value={report.name}>
              {report.name}
            </option>
          ))}
        </select>

        {/* Custom Report Input */}
        <label>Or Enter Custom Report Name:</label>
        <input
          type="text"
          placeholder="Custom Report Name"
          value={customReport}
          onChange={(e) => setCustomReport(e.target.value)}
          style={styles.input}
        />

        {/* Report Scheduling */}
        <label>Schedule Report:</label>
        <select name="schedule" value={schedule} onChange={(e) => setSchedule(e.target.value)} style={styles.input}>
          <option value="None">None</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Quarterly">Quarterly</option>
          <option value="Yearly">Yearly</option>
        </select>

        <button onClick={generateReport} style={styles.button}>
          Generate Report
        </button>
        <button onClick={downloadReport} style={styles.downloadButton}>
          Download Report
        </button>

        {reportOutput && <div style={styles.reportOutput}>{reportOutput}</div>}
      </div>

      <h3 style={styles.subTitle}>Automated Scheduled Reporting</h3>
      <p>Support predefined and custom report formats. Automate reports for regulatory deadlines.</p>
    </div>
  );
};

// Stylish UI for Reports Page
const styles = {
  container: {
    maxWidth: "1000px", // Responsive container width
    width: "50%",
    margin: "auto",
    padding: "30px",
    backgroundColor: "#fffbe6",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#8B4513",
  },
  subTitle: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#5a3d1b",
    marginTop: "20px",
  },
  reportList: {
    paddingLeft: "20px",
    fontSize: "12px",
    lineHeight: "1.6",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #8B4513",
    fontSize: "12px",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#8B4513",
    color: "white",
    padding: "12px",
    fontSize: "12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },
  downloadButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "12px",
    fontSize: "12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },
  reportOutput: {
    marginTop: "15px",
    padding: "10px",
    backgroundColor: "#DFF2BF",
    color: "#4F8A10",
    borderRadius: "5px",
    fontWeight: "bold",
    textAlign: "center",
  },
};

export default AuditReports;
