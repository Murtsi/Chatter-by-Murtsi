const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let messages = []; // Array to store chat messages

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.js'));
});

io.on('connection', (socket) => {
  console.log('New client connected');

  // Send stored messages to the client
  socket.emit('chat history', messages);

  socket.on('chat message', (data) => {
    const timestamp = new Date().toLocaleTimeString();
    const messageData = { ...data, timestamp };
    messages.push(messageData); // Store the message
    io.emit('chat message', messageData);
  });

  socket.on('user connected', (username) => {
    const timestamp = new Date().toLocaleTimeString();
    const connectMessage = { username, message: 'has connected', timestamp };
    messages.push(connectMessage);
    io.emit('chat message', connectMessage);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));