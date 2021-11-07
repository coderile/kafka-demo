const {Kafka} = require('kafkajs')
const Chance = require('chance')
const chance = new Chance()

const kafka=new Kafka(
    {
        clientId:"my-app",
        brokers:['localhost:9092']
    }
)

const producer = kafka.producer()

const topic = 'animals'

const producerMssage =async()=>{
    // await producer.connect()
    const value= chance.animal()
    try{
        await producer.send({
            topic:topic,
            messages:[
                {value:value}
            ]
        })
        console.log(value)
    }catch(error){
        console.log(error)
    }
}

const run = async()=>{
    await producer.connect()
    setInterval(producerMssage,1000)
}
run().catch(console.error)
