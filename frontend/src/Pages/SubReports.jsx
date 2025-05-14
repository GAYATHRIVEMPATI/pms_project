import React, { useState } from "react";

// Function to generate CSV data for download
const generateCSV = (reportType, data) => {
  const headers = Object.keys(data[0]).join(",");
  const rows = data.map(row => Object.values(row).join(",")).join("\n");
  return `data:text/csv;charset=utf-8,${headers}\n${rows}`;
};

const Reports = () => {
  const predefinedReports = [
    { id: 1, name: "Procurement Requests" },
    { id: 2, name: "Approvals" },
    { id: 3, name: "Vendor Performance" },
    { id: 4, name: "Inventory" }
  ];

  const departments = [
    "IT", "HR", "Finance", "Operations", "Marketing", "Sales",
    "Procurement", "Legal", "R&D", "Administration", "Customer Support"
  ];

  const [selectedReport, setSelectedReport] = useState("");
  const [customReport, setCustomReport] = useState("");
  const [schedule, setSchedule] = useState("None");
  const [reportOutput, setReportOutput] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleReportSelection = (e) => {
    setSelectedReport(e.target.value);
  };

  const filterData = (data) => {
    return data.filter(item => {
      const date = new Date(item.Date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      const isWithinRange =
        (!start || date >= start) &&
        (!end || date <= end);

      const matchesDepartment =
        !departmentFilter || item.Department === departmentFilter;

      const matchesStatus =
        selectedReport !== "Procurement Requests" || !statusFilter || item.Status === statusFilter;

      return isWithinRange && matchesDepartment && matchesStatus;
    });
  };

// Generate Report Request
// Generate Report Request
const generateReport = async () => {
  if (!selectedReport && !customReport) {
    setReportOutput("Please select or enter a report type.");
    return;
  }

  const reportName = selectedReport || customReport;

  const reportData = {
    reportType: reportName,
    startDate,
    endDate,
    departmentFilter,
    statusFilter,
    customReport,
    schedule
  };

  try {
    const response = await fetch('http://localhost:5000/api/reports/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reportData),
    });

    const result = await response.json();

    if (response.ok) {
      setReportOutput(`Generated "${reportName}" report with ${result.filteredData.length} records.`);
    } else {
      setReportOutput(result.message);
    }
  } catch (error) {
    console.error(error);
    setReportOutput('Error generating the report.');
  }
};

// Download Report Request
const downloadReport = async () => {
  const reportName = selectedReport || customReport;

  const reportData = {
    reportType: reportName,
    startDate,
    endDate,
    departmentFilter,
    statusFilter,
    customReport,
  };

  try {
    const response = await fetch('http://localhost:5000/api/reports/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reportData),
    });

    if (response.ok) {
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${reportName}.csv`;
      link.click();
    } else {
      const result = await response.json();
      setReportOutput(result.message);
    }
  } catch (error) {
    console.error(error);
    setReportOutput('Error downloading the report.');
  }
};


  const isProcurement = selectedReport === "Procurement Requests";

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📊 Custom Reports </h1>

      <h3 style={styles.subTitle}>Select & Filter Reports</h3>
      <div style={styles.form}>
        <label>Report Type:</label>
        <select name="reportType" value={selectedReport} onChange={handleReportSelection} style={styles.input}>
          <option value="">Select Report</option>
          {predefinedReports.map((report) => (
            <option key={report.id} value={report.name}>{report.name}</option>
          ))}
        </select>

        <label>Or Enter Custom Report Name:</label>
        <input
          type="text"
          placeholder="e.g., Custom IT Spending"
          value={customReport}
          onChange={(e) => setCustomReport(e.target.value)}
          style={styles.input}
        />

        <label>From Date:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={styles.input} />

        <label>To Date:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={styles.input} />

        <label>Filter by Department:</label>
        <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)} style={styles.input}>
          <option value="">All Departments</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>

        {isProcurement && (
          <>
            <label>Filter by Status:</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={styles.input}>
              <option value="">All Statuses</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </>
        )}

        <label>Schedule Report:</label>
        <select name="schedule" value={schedule} onChange={(e) => setSchedule(e.target.value)} style={styles.input}>
          <option value="None">None</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Quarterly">Quarterly</option>
          <option value="Yearly">Yearly</option>
        </select>

        <button onClick={generateReport} style={styles.button}>Generate Report</button>
        <button onClick={downloadReport} style={styles.downloadButton}>Download CSV</button>

        {reportOutput && (
          <div style={styles.reportOutput}>{reportOutput}</div>
        )}
      </div>
    </div>
  );
};

const styles = {
    container: {
        maxWidth: "700px",   // reduced from 1000px
        width: "100%",        // can be 70% if you want it narrower
        margin: "20px auto",
        padding: "20px",     // smaller padding
        backgroundColor: "#fffbe6",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#8B4513",
  },
  subTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#5a3d1b",
    marginTop: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    marginTop: "10px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",  // reduced from 15px
  },
  
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #8B4513",
    fontSize: "16px",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#8B4513",
    color: "white",
    padding: "12px",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },
  downloadButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "12px",
    fontSize: "16px",
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

export default Reports;
