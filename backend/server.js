const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

console.log("✅ Middleware setup done");

// 👇 This should log when the route is loaded
console.log("✅ userRoutes loaded");
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/departments', require('./routes/departmentRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));
const expenditureRoutes = require('./routes/expenditureRoutes');
app.use('/api/expenditure', expenditureRoutes);
app.use('/api/analytics-reports', require('./routes/analyticsreportRoutes'));
app.use('/api/auditreports', require('./routes/auditreportRoutes'));
app.use('/api/audit-logs', require('./routes/auditRoutes'));
app.use('/api/procurements', require('./routes/procurementRoutes'));
app.use('/api/procurement-requests', require('./routes/procurementRequests'));
app.use('/api/notification-procurements', require('./routes/notificationProcurementRoutes'));
app.use('/api/alerts', require('./routes/alertRoutes'));
app.use('/api/chats', require('./routes/chatRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/po', require('./routes/poRoutes'));


app.get('/', (req, res) => {
  console.log("✅ Root route hit");
  res.send('Root is working');
});
console.log("✅ Routes setup done");
// Seed Departments route (optional, for one-time department seeding)
const Department = require('./models/Department');
app.get('/seed-departments', async (req, res) => {
  await Department.insertMany([
    { name: "IT" },
    { name: "CSE" },
    { name: "ECE" },
    { name: "EEE" }
  ]);
  res.send("Departments seeded!");
});


app.listen(PORT, () => {
  console.log(`✅ Backend is up on port ${PORT}`);
});
