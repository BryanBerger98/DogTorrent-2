const http = require('http');
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: ['http://localhost:3000'],
    optionsSuccessStatus: 200
}));

const io = require('./services/sockets.service').init(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use('/torrents', require('./routes/torrents.routes'));

io.on('connection', (socket) => {
    console.log('a user connected');
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

server.listen(3001, () => {
    console.log('Started on port', 3001);
});