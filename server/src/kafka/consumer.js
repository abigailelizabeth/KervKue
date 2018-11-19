const url = "http://localhost:5000/api/kafkaTest";

var kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.KafkaClient({kafkaHost: 'localhost:9092' }),
    consumer = new Consumer(
        client,
        [
            { topic: 'kafka-test', partition: 0 }
        ],
        {
            autoCommit: true
        }
    );
module.exports = io => {
    io.on('connection', function(socket){
        console.log('Something connected: ');
        consumer.on('message', function (message) {
            const data = {kafka: message}
            order = JSON.parse(message.value);
            socket.emit('order_item', order);
        });
    })
}
   
 consumer.connect();