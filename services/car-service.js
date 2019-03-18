const mongoService = require('./mongo-service') 

const ObjectId = require('mongodb').ObjectId;


function query() {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('car');
            return collection.find({}).toArray()
        })
}

function remove(carId) {
    carId = new ObjectId(carId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('car');
            return collection.remove({ _id: carId })
        })
}
function getById(carId) {
    carId = new ObjectId(carId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('car');
            return collection.findOne({ _id: carId })
        })
}

function add(car) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('car');
            return collection.insertOne(car)
                .then(result => {
                    console.log('RESULT IS', result)
                    car._id = result.insertedId;
                    return car;
                })
        })
}

function update(car) {
    car._id = new ObjectId(car._id)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('car');
            return collection.updateOne({ _id: car._id }, { $set: car })
                .then(result => {
                    return car;
                })
        })
}

module.exports = {
    query,
    remove,
    getById,
    add,
    update
}
