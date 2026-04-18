const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

// Only allow 2 users per room
const rooms = {}; // roomCode -> [socket.id, socket.id]

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', ({ roomCode, username }) => {
    if (!rooms[roomCode]) rooms[roomCode] = [];

    const room = rooms[roomCode];

    if (room.length >= 2) {
      socket.emit('room-full');
      return;
    }

    room.push(socket.id);
    socket.join(roomCode);
    socket.data.roomCode = roomCode;
    socket.data.username = username;

    socket.emit('joined', { username, memberCount: room.length });

    if (room.length === 2) {
      // Get the other user's name
      const otherSocketId = room.find(id => id !== socket.id);
      const otherSocket = io.sockets.sockets.get(otherSocketId);
      const otherName = otherSocket?.data?.username || 'Someone';

      io.to(roomCode).emit('both-connected', { message: `${username} joined! You're both here now 🎉` });
    } else {
      socket.emit('waiting', { message: 'Waiting for your friend to join...' });
    }
  });

  socket.on('send-message', ({ roomCode, message, username }) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    io.to(roomCode).emit('receive-message', { message, username, timestamp, senderId: socket.id });
  });

  socket.on('typing', ({ roomCode, username }) => {
    socket.to(roomCode).emit('user-typing', { username });
  });

  socket.on('stop-typing', ({ roomCode }) => {
    socket.to(roomCode).emit('user-stop-typing');
  });

  socket.on('disconnect', () => {
    const roomCode = socket.data.roomCode;
    const username = socket.data.username;
    if (roomCode && rooms[roomCode]) {
      rooms[roomCode] = rooms[roomCode].filter(id => id !== socket.id);
      if (rooms[roomCode].length === 0) delete rooms[roomCode];
      else io.to(roomCode).emit('user-left', { message: `${username} disconnected 😢` });
    }
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
