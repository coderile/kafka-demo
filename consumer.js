const { Kafka } = require('kafkajs')
const Chance = require('chance')
const chance = new Chance()

const kafka = new Kafka(
    {
        clientId: "my-consumer",
        groupId :"consumer-group",
        brokers: ['localhost:9092']
    }
)

const consumer = kafka.consumer({groupId :"consumer-group"})

const topic = 'animals'
const run= async ()=>{

await consumer.connect()
await consumer.subscribe({ topic: topic })

await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        console.log({
            partition,
            offset: message.offset,
            value: message.value.toString(),
        })
    },
})

}



run().catch(console.error)
