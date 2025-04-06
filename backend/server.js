// Other imports...
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

console.log("✅ server.js started");  // ADD THIS

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

console.log("✅ Middleware setup done"); // ADD THIS

// ROUTES - ✅ This should be active
app.use('/api/users', require('./routes/userRoutes'));

console.log("✅ Routes setup done"); // ADD THIS

app.listen(PORT, () => {
  console.log(`✅ Backend is up on port ${PORT}`);
});
