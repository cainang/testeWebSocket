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

let port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('listening on *: ' + port);
});