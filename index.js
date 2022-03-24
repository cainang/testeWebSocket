const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
app.use(cors('*'));
const http = require('http').Server(app);

//const server = http.createServer(app);

const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('event change', (msg) => {
      console.log('message: ' + msg);
    });
});  

function getData(time = 0) {
  setTimeout(async () => {
    const response = await axios.get('https://radio.assembleiadedeusiadep.com/api/nowplaying/1');
    io.emit('music change', JSON.stringify(response.data));

    let played_at = response.data.playing_next.played_at;
    let time_now = new Date().getTime();
    let time_left = (played_at * 1000) - time_now;
    console.log(time_left);
    getData(time_left);
  }, time);
}

getData();

app.get('/', async (req, res) => {
  const response = await axios.get('https://radio.assembleiadedeusiadep.com/api/nowplaying/1')
  io.emit('music change', JSON.stringify(response.data));
  res.send('<h1>Hello world</h1>');
});

app.post('/', (req, res) => {
  io.emit('event change', req.body);
  res.send('<h1>Hello world</h1>');
});

let port = 3000;

http.listen(port, () => {
  console.log('listening on *: ' + port);
});