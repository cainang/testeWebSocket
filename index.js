const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
app.use(cors('*'));

const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
});  

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});