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
            autoCommit: false
        }
    );
    consumer.on('message', function (message) {
        const data = {kafka: message}
        console.log('sent request to kervServer....', message);
    });
    consumer.connect();