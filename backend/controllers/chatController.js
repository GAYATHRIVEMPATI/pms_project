const Chat = require('../models/Chat');

exports.saveMessage = async (req, res) => {
  const { message } = req.body;
  if (!message || !message.trim()) {
    return res.status(400).json({ message: 'Message cannot be empty' });
  }

  try {
    const newMessage = new Chat({ message });
    await newMessage.save();
    res.status(201).json({ message: 'Message saved successfully' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Chat.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.clearMessages = async (req, res) => {
  try {
    await Chat.deleteMany({});
    res.status(200).json({ message: 'All chat messages cleared' });
  } catch (error) {
    console.error('Error clearing messages:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
