const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


http.listen(config.port, config.host, () => {
    console.log("Listening on http://", config.host, ":", config.port);
    require('./utils/db');
    require('./kafka/consumer')(io);
    require('./kafka/producer');
})

module.exports = io;