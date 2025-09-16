const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// 'public' 폴더를 정적 파일 경로로 설정
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('create or join', (room) => {
        const clientsInRoom = io.sockets.adapter.rooms.get(room);
        const numClients = clientsInRoom ? clientsInRoom.size : 0;

        if (numClients === 0) {
            socket.join(room);
            socket.emit('created', room, socket.id);
        } else if (numClients === 1) {
            socket.join(room);
            socket.emit('joined', room, socket.id);
            socket.to(room).emit('peer-joined', socket.id);
        } else {
            socket.emit('full', room);
        }
    });

    socket.on('message', (message, room) => {
        console.log(`Message from ${socket.id}:`, message.type);
        socket.to(room).emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

const port = 8080;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});