const Drink = require('../models/drink');
const Inventory = require('../models/inventory');

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
    io.on('connection', (socket) => {
        console.log('*** Socket Connection with Client Starting.. ***');

        consumer.on('message', (message) => {
            orderItem = JSON.parse(message.value)
            order = {}
           
            Drink.findOne({_id: orderItem.drink}, 'name')
            .then(drinkDoc => {
                order['drink'] = drinkDoc.name;
                Inventory.findOne({_id: orderItem.bean}, 'name')
                .then(beanDoc => {
                    order['bean'] = beanDoc.name

                    if(orderItem.milk !== null) {
                        Inventory.findOne({_id: orderItem.milk}, 'name')
                        .then(milkDoc => {
                            order['milk'] = milkDoc.name
                            socket.emit('order_item', order);
                        })
                        .catch(err => {
                            console.log('Error searching for milk: ', err)
                        })
                    }
                    else {
                         socket.emit('order_item', order);
                    }
                })
                .catch(err => {
                    console.log('Error searching for bean: ', err)
                })
            })
            .catch(err => {
                console.log('Error finding drink: ', err);
            })
            
        });
    })
}
   
 consumer.connect();