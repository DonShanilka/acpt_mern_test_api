const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
const { MongoClient, ObjectId } = require('mongodb')

const cors = require('cors');
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'testMongo';

const db = client.db(dbName);
const collection = db.collection('test1');


app.get('/', async (req, res) => {
    const findResult = await collection.find({}).toArray();
    res.send(findResult);
})

app.post('/', async (req, res) => {
    console.log(req.body)
    const insertResult = await collection.insertOne(req.body);
    res.send(insertResult);
})

app.put('/:id', async (req, res) => {
    const updateResult = await collection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
    console.log('Updated documents =>', updateResult);
})

app.delete('/:id', async (req, res) => {
    const deleteResult = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.send(deleteResult);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

