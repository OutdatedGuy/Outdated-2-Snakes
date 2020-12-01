const express = require('express');
const app = express();

const server = app.listen(1412);
console.log('Starting server at 1412');
app.use(express.static('public'));

const socket = require('socket.io');
const io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log('new connection: ' + socket.id);
}