const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

// Route to create a new session when the user logs in
router.post('/start-session', async (req, res) => {
  try {
    const { user_id } = req.body;

    const session = new Session({
      user_id,
      session_id: `session-${new Date().getTime()}`, // Unique session ID (timestamp-based)
    });

    await session.save();
    res.status(200).json({ message: 'Session started', session });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to update logout time when the user logs out
router.post('/end-session', async (req, res) => {
  try {
    const { session_id } = req.body;

    const session = await Session.findOne({ session_id });

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    session.logout_time = new Date();
    await session.save();

    res.status(200).json({ message: 'Session ended', session });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get all sessions for a specific user
router.get('/user-sessions/:user_id', async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.params.user_id });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
