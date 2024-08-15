const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'testMongo';

const db = client.db(dbName);
const collection = db.collection('test1');


app.get('/', async (req, res) => {
    console.log(req.body)
    const insertResult = await collection.insertOne(req.body)
    res.send(insertResult)
})

app.post('/', async (req, res) => {
    console.log(req.body)
    const insertResult = await collection.insertOne(req.body)
    res.send(insertResult)
})

app.put('/', (req, res) => {
    res.send('(Put req) Hello World!')
})

app.delete('/', (req, res) => {
    res.send('(Delete req) Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

