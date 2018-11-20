const OrderItem = require('../models/orderItem');

const url = "http://localhost:5000/api/kafkaTest";

var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.KafkaClient({kafkaHost: 'localhost:9092' }),
    producer = new Producer(client)

 const pipeline = [{
    $lookup: {
        from: 'drinks',
        localField: 'fullDocument.drink',
        foreignField: '_id',
        as: 'fullDocument.drink'
    }
 },
 {
    $lookup: {
        from: 'inventories',
        localField: 'fullDocument.milk',
        foreignField: '_id',
        as: 'fullDocument.milk'
    }
 },
 {
    $lookup: {
        from: 'inventories',
        localField: 'fullDocument.bean',
        foreignField: '_id',
        as: 'fullDocument.bean'
    }
 }]   

producer.on('ready', function () {
    const changeStream = OrderItem.watch().on('change', change => {
        producer.send([{topic: 'kafka-test', messages: JSON.stringify(change.fullDocument), partition: 0}], function(err, data){
            console.log(data);
        })

    })
});

producer.on('error', function (err) {})

