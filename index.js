const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const moment = require('moment'); // Ensure moment is installed

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Allows all origins; update this to match your frontend URL in production
    methods: ["GET", "POST"]
  }
});

// Handle socket connections
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', ({ username, text }) => {
    const timestamp = moment().format('h:mm A'); // Format timestamp
    io.emit('message', { username, text, timestamp });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
