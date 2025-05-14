const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Role = require('../models/Role');
const Session = require('../models/Session');
const { v4: uuidv4 } = require('uuid'); // ✅ To generate unique session IDs

// ✅ Login Route + Create Session
router.post('/login', async (req, res) => {
  const { userId, password, role } = req.body;

  try {
    const user = await User.findOne({ user_id: userId });

    if (!user) return res.status(404).json({ message: "User not found." });
    if (user.password !== password)
      return res.status(401).json({ message: "Incorrect password." });

    // ✅ Role verification (based on name)
    const roleDoc = await Role.findOne({ role_id: user.role_id });
    if (!roleDoc || roleDoc.role_name !== role) {
      return res.status(401).json({ message: "Role mismatch." });
    }

    // ✅ Create a new session with unique session_id
    const session_id = uuidv4();
    const newSession = new Session({
      session_id,
      user_id: user.user_id,
      login_time: new Date(),
    });
    await newSession.save();

    res.status(200).json({
      message: "Login successful",
      user: {
        user_id: user.user_id,
        username: user.username,
        role: roleDoc.role_name,
      },
      session_id: newSession.session_id,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Logout Route: update logout_time
router.post('/logout', async (req, res) => {
  const { session_id } = req.body;

  try {
    const session = await Session.findOne({ session_id });

    if (!session)
      return res.status(404).json({ message: "Session not found." });

    session.logout_time = new Date();
    await session.save();

    res.status(200).json({ message: "Logout time updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// ✅ View Activity (all sessions for a user)
router.get('/activity/:user_id', async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.params.user_id }).sort({ login_time: -1 });
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// ✅ Get Profile with role_name
router.get('/profile/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ user_id: userId });

    if (!user) return res.status(404).json({ message: "User not found." });

    const role = await Role.findOne({ role_id: user.role_id });

    res.status(200).json({
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      department: user.department,
      role: role ? role.role_name : "Unknown",
      created_at: user.created_at,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Edit Profile Route
router.put('/edit/:userId', async (req, res) => {
  const { userId } = req.params;
  const { username, email, phone, department } = req.body;

  try {
    const user = await User.findOne({ user_id: userId });

    if (!user) return res.status(404).json({ message: "User not found" });

    user.username = username;
    user.email = email;
    user.phone = phone;
    user.department = department;

    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Edit error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Validate Session Route
router.post('/validate-session', async (req, res) => {
  const { session_id } = req.body;

  try {
    const session = await Session.findOne({ session_id });

    if (!session || session.logout_time) {
      return res.status(200).json({ valid: false });
    }

    return res.status(200).json({ valid: true });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Get All Users with Role Names
router.get('/all', async (req, res) => {
  try {
    const users = await User.find();

    // Get all roles in one go
    const roles = await Role.find();
    const roleMap = {};
    roles.forEach(role => {
      roleMap[role.role_id] = role.role_name;
    });

    const usersWithRoles = users.map(user => ({
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      role: roleMap[user.role_id] || "Unknown"
    }));

    res.status(200).json(usersWithRoles);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Delete User Route
router.delete('/delete/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOneAndDelete({ user_id: userId });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


router.post("/add", async (req, res) => {
  const { user_id, email, phone } = req.body;

  try {
    // Check if the user ID already exists
    const existingUserId = await User.findOne({ user_id });
    if (existingUserId) {
      return res.status(400).json({ message: "User ID already exists" });
    }

    // Check if the email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check if the phone already exists (if needed)
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ message: "Phone number already exists" });
    }

    // Proceed to create the user
    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});




module.exports = router;
