const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;


function checkLogin({ nickname }) {
    return mongoService.connect()
        .then(db => db.collection('user').findOne({ nickname }))
}


function getById(id) {
    const _id = new ObjectId(id)
    return mongoService.connect()
        .then(db => db.collection('user').findOne({ _id }))
}



function query() {
    return mongoService.connect()
        .then(db => db.collection('user').find({}).toArray())
}

// todo  - add user only if nickname is not taken
function addUser({ nickname }) {
    var user = { nickname }
    return mongoService.connect()
        .then(db => db.collection('user').insertOne(user))
        .then(res => {
            user._id = res.insertedId
            return user
        })
}







module.exports = {
    query,
    getById,
    addUser,
    checkLogin
}