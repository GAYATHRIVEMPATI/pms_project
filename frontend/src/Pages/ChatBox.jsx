import React, { useState, useEffect } from 'react';

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false); // For loading state

  // Fetch chat messages from the server
  const fetchMessages = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch('http://localhost:5000/api/chats');
      if (response.ok) {
        const data = await response.json();
        setChat(data);
      } else {
        console.error('Error fetching messages:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false); // End loading
    }
  };

  // Fetch messages when the component mounts
  useEffect(() => {
    fetchMessages();
  }, []);

  // Send message to the server
  const handleSend = async () => {
    if (message.trim()) {
      try {
        const response = await fetch('http://localhost:5000/api/chats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        });

        if (response.ok) {
          setMessage('');
          fetchMessages(); // Refresh chat after sending
        } else {
          console.error('Error sending message:', await response.text());
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  // Inline styles for chatbox
  const boxStyle = {
    background: 'white',
    padding: '1rem',
    borderRadius: '10px',
    boxShadow: '0 0 5px #aaa',
    maxWidth: '400px',
    margin: 'auto',
  };

  const messagesStyle = {
    minHeight: '100px',
    borderBottom: '1px solid #ccc',
    marginBottom: '10px',
    padding: '0.5rem',
    overflowY: 'auto',
    maxHeight: '300px',
  };

  const inputAreaStyle = {
    display: 'flex',
    gap: '1rem',
  };

  const inputStyle = {
    flex: 1,
    padding: '0.5rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: '#884a0a',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div style={boxStyle}>
      <h3>Chat Box</h3>
      <div style={messagesStyle}>
        {loading ? (
          <p>Loading messages...</p>
        ) : chat.length === 0 ? (
          <p>No messages yet. Start the conversation!</p>
        ) : (
          chat.map((msg, idx) => (
            <p key={idx}>{msg.message}</p>
          ))
        )}
      </div>
      <div style={inputAreaStyle}>
        <input
          type="text"
          value={message}
          placeholder="Type message..."
          onChange={(e) => setMessage(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleSend} style={buttonStyle}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
