// /*const express = require('express');
// const router = express.Router();
// const Report = require('../models/Report');

// // Get all reports
// router.get('/', async (req, res) => {
//   const reports = await Report.find();
//   res.json(reports);
// });

// // Add report
// router.post('/', async (req, res) => {
//   const newReport = new Report(req.body);
//   await newReport.save();
//   res.json(newReport);
// });

// module.exports = router;*/

// const express = require('express');
// const router = express.Router();
// const Report = require('../models/Report');
// const Product = require('../models/Product');

// // Get all reports
// router.get('/', async (req, res) => {
//   const reports = await Report.find();
//   res.json(reports);
// });

// // Add report AND update product allocatedAmount
// router.post('/', async (req, res) => {
//   const {
//     productId,
//     productName,
//     department,
//     category,
//     expenditureAmount,
//     remainingAmount,
//     date
//   } = req.body;

//   // Create report record
//   const newReport = new Report({
//     productId,
//     productName,
//     department,
//     category,
//     expenditureAmount,
//     remainingAmount,
//     date
//   });
//   await newReport.save();

//   // Update product's allocatedAmount in products collection
//   await Product.findOneAndUpdate(
//     { productId },
//     { allocatedAmount: remainingAmount }
//   );

//   res.json({ message: 'Product budget updated successfully in product and reports.' });
// });


// // POST /api/reports/generate
// router.post('/generate', async (req, res) => {
//   try {
//     const { reportType, startDate, endDate, departmentFilter, statusFilter } = req.body;

//     const query = {};

//     if (reportType) query.productName = reportType;
//     if (startDate || endDate) {
//       query.date = {};
//       if (startDate) query.date.$gte = startDate;
//       if (endDate) query.date.$lte = endDate;
//     }
//     if (departmentFilter) query.department = departmentFilter;
//     if (statusFilter) query.status = statusFilter; // Only if `status` exists in schema

//     const filteredData = await Report.find(query);

//     res.json({ filteredData });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error generating report.' });
//   }
// });


// module.exports = router;




// const express = require('express');
// const router = express.Router();
// const Report = require('../models/Report');
// const Product = require('../models/Product');
// const { Parser } = require('json2csv');
// const fs = require('fs');
// const path = require('path');


// // ✅ GET all reports (for dashboard etc.)
// router.get('/', async (req, res) => {
//   const reports = await Report.find();
//   res.json(reports);
// });

// // ✅ POST: Add new report + update product budget
// router.post('/', async (req, res) => {
//   const {
//     productId,
//     productName,
//     department,
//     category,
//     expenditureAmount,
//     remainingAmount,
//     date,
//     status // ✅ add status if using it in frontend filter
//   } = req.body;

//   const newReport = new Report({
//     productId,
//     productName,
//     department,
//     category,
//     expenditureAmount,
//     remainingAmount,
//     date,
//     status
//   });

//   await newReport.save();

//   await Product.findOneAndUpdate(
//     { productId },
//     { allocatedAmount: remainingAmount }
//   );

//   res.json({ message: 'Product budget updated successfully in product and reports.' });
// });


// // POST /api/reports/generate
// const generateReport = async (req, res) => {
//   const {
//     reportType,
//     customReport,
//     startDate,
//     endDate,
//     departmentFilter,
//     statusFilter,
//     schedule
//   } = req.body;

//   const reportName = reportType || customReport;
//   if (!reportName) {
//     return res.status(400).json({ message: 'Report type or custom report name must be provided.' });
//   }

//   try {
//     const reports = await Report.find(); // 🟢 disable filter temporarily
//     ;

//     const filteredData = reports.filter(item => {
//       const itemDate = new Date(item.date);
//       const from = startDate ? new Date(startDate) : null;
//       const to = endDate ? new Date(endDate) : null;

//       const isInRange = (!from || itemDate >= from) && (!to || itemDate <= to);
//       const matchesDept = !departmentFilter || item.department === departmentFilter;
//       const matchesStatus = !statusFilter || item.status === statusFilter;

//       return isInRange && matchesDept && matchesStatus;
//     });

//     if (filteredData.length === 0) {
//       return res.status(404).json({ message: 'No data found for the selected filters.' });
//     }

//     res.json({
//       reportName,
//       schedule: schedule || 'None',
//       filteredData
//     });
//   } catch (error) {
//     console.error('Error generating report:', error);
//     res.status(500).json({ message: 'Error generating report.' });
//   }
// };

// // POST /api/reports/download
// const downloadReport = async (req, res) => {
//   const {
//     reportType,
//     customReport,
//     startDate,
//     endDate,
//     departmentFilter,
//     statusFilter
//   } = req.body;

//   const reportName = reportType || customReport;
//   if (!reportName) {
//     return res.status(400).json({ message: 'Report type or custom report name must be provided.' });
//   }

//   try {
//     const reports = await Report.find({ productName: reportName });

//     const filteredData = reports.filter(item => {
//       const itemDate = new Date(item.date);
//       const from = startDate ? new Date(startDate) : null;
//       const to = endDate ? new Date(endDate) : null;

//       const isInRange = (!from || itemDate >= from) && (!to || itemDate <= to);
//       const matchesDept = !departmentFilter || item.department === departmentFilter;
//       const matchesStatus = !statusFilter || item.status === statusFilter;

//       return isInRange && matchesDept && matchesStatus;
//     });

//     if (filteredData.length === 0) {
//       return res.status(404).json({ message: 'No data to download for selected filters.' });
//     }

//     const headers = Object.keys(filteredData[0]).join(',');
//     const rows = filteredData.map(row =>
//       Object.values(row).map(val => `"${String(val).replace(/"/g, '""')}"`).join(',')
//     ).join('\n');
    
//     const csvContent = `${headers}\n${rows}`;
//     const fileName = `${reportName.replace(/\s+/g, '_')}_report.csv`;
//     const filePath = path.join(__dirname, 'temp', fileName);
    
//     // Write file
//     fs.writeFileSync(filePath, csvContent);
    
//     // Send for download
//     res.download(filePath, fileName, err => {
//       if (err) {
//         console.error('Download error:', err);
//         res.status(500).send('Error downloading the file.');
//       } else {
//         fs.unlinkSync(filePath); // delete after sending
//       }
//     });
    
    

//   } catch (error) {
//     console.error('Error downloading report:', error);
//     res.status(500).json({ message: 'Error downloading report.' });
//   }
// };


// router.post('/generate', generateReport);
// router.post('/download', downloadReport);


// module.exports = router;



const express = require('express');
const router = express.Router();
const Report = require('../models/AnalyticsReport');
const Product = require('../models/Product');
const { generateReport, downloadReport } = require("../controllers/reportsController");
const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');


// ✅ GET all reports
router.get('/', async (req, res) => {
  const reports = await Report.find();
  res.json(reports);
});

// ✅ POST: Add new report + update product budget
router.post('/', async (req, res) => {
  const {
    productId,
    productName,
    department,
    category,
    expenditureAmount,
    remainingAmount,
    date,
    status // optional
  } = req.body;

  const newReport = new Report({
    productId,
    productName,
    department,
    category,
    expenditureAmount,
    remainingAmount,
    date,
    status
  });

  await newReport.save();

  await Product.findOneAndUpdate(
    { productId },
    { allocatedAmount: remainingAmount }
  );

  res.json({ message: 'Product budget updated successfully in product and reports.' });
});

// ✅ POST /api/reports/generate
router.post('/generate', async (req, res) => {
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
    const reports = await Report.find({ productName: reportName });

    const filteredData = reports.filter(item => {
      const itemDate = new Date(item.date);
      const from = startDate ? new Date(startDate) : null;
      const to = endDate ? new Date(endDate) : null;

      const isInRange = (!from || itemDate >= from) && (!to || itemDate <= to);
      const matchesDept = !departmentFilter || item.department === departmentFilter;
      const matchesStatus = !statusFilter || item.status === statusFilter;

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
    console.error('Error generating report:', error);
    res.status(500).json({ message: 'Error generating report.' });
  }
});

// ✅ POST /api/reports/download
router.post('/download', async (req, res) => {
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
    const reports = await Report.find({ productName: reportName });

    const filteredData = reports.filter(item => {
      const itemDate = new Date(item.date);
      const from = startDate ? new Date(startDate) : null;
      const to = endDate ? new Date(endDate) : null;

      const isInRange = (!from || itemDate >= from) && (!to || itemDate <= to);
      const matchesDept = !departmentFilter || item.department === departmentFilter;
      const matchesStatus = !statusFilter || item.status === statusFilter;

      return isInRange && matchesDept && matchesStatus;
    });

    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'No data to download for selected filters.' });
    }

    // ✅ Convert to CSV
    const parser = new Parser();
    const csvContent = parser.parse(filteredData);

    const fileName = `${reportName.replace(/\s+/g, '_')}_report.csv`;
    const filePath = path.join(__dirname, '..', 'temp', fileName);

    // ✅ Ensure temp folder exists
    if (!fs.existsSync(path.join(__dirname, '..', 'temp'))) {
      fs.mkdirSync(path.join(__dirname, '..', 'temp'));
    }

    // ✅ Write and send file
    fs.writeFileSync(filePath, csvContent);
    res.download(filePath, fileName, err => {
      if (err) {
        console.error('Download error:', err);
        res.status(500).send('Error downloading the file.');
      } else {
        fs.unlinkSync(filePath); // cleanup
      }
    });

  } catch (error) {
    console.error('Error downloading report:', error);
    res.status(500).json({ message: 'Error downloading report.' });
  }
});

// Route to generate a report (filter + return data)
router.post('/generate', generateReport);

// Route to download a filtered report as CSV
router.post('/download', downloadReport);

module.exports = router;
