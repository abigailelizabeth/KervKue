const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen(config.port, config.host, () => {
    console.log("Listening on http://", config.host, ":", config.port);
    require('./utils/db');
    require('./kafka/consumer');
    require('./kafka/producer');
})

module.exports = app;