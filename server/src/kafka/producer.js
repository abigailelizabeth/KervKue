const url = "http://localhost:5000/api/kafkaTest";

var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.KafkaClient({kafkaHost: 'localhost:9092' }),
    producer = new Producer(client),
    payloads = [{topic: 'kafka-test', messages: 'hellow', partition: 0},
                {topic: 'kafka-test', messages: 'howdy', partition: 0}]

producer.on('ready', function () {
    //producer.send({topic: 'kafka-test', messages: <message from db> , partition: 0})
    producer.send(payloads, function (err, data) {
        console.log(data);
    });
});

producer.on('error', function (err) {})