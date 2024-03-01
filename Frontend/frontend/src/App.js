import "./App.css";
import React, { useState, useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const connection = useRef(null); // Use a ref to store the SignalR connection
  
  useEffect(() => {
  // Connect to the ChatHub
  const connectToHub = async () => {
  connection.current = new signalR.HubConnectionBuilder().withUrl("http://localhost:5288/chatHub").build();
  
  // Receive messages
  connection.current.on("ReceiveMessage", (user, message) => {
  setMessages((messages) => [...messages, { user, message }]);
  });
  
  await connection.current.start();
  };
  
  connectToHub().catch((error) => console.error(error));
  
  // Cleanup function for when the component unmounts
  return () => {
  if (connection.current) {
  connection.current.stop();
  }
  };
  }, []);
  
  const handleSendMessage = async () => {
  if (connection.current) {
  // sending the message using connection.current object
  await connection.current.invoke("SendMessage", "New User", newMessage);
  // clear input field
  setNewMessage("");
  } else {
  console.error('SignalR connection is not established.');
  }
  };

  
  return (
    <div className="App">
      <header className="App-header">
        <p>This is a chatroom application</p>
        </header>
        <body>
          <p className="messageText">Messages</p>
          <div className="MessageContainer">
            <input type="text" className="textInput" placeholder="Input your message" value={newMessage} 
              newMessage state onChange={(e)=> setNewMessage(e.target.value)} required // Update newMessage on input change
            />
            <button className="sendMessageButton" value="Send Message" id="sendMessageButton" onClick={handleSendMessage}>
              Send Message
            </button>
          </div>
        
          <div className="messageDisplay">
            <ul id="messageList">
              {messages.map((msg, index) => (
              <li key={index}>
                {msg.user}: {msg.message}
              </li>
              ))}
            </ul>
          </div>
        </body>
    </div>
  );
}

export default App;
