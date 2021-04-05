const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: String,
    age: Number,
    imageUrl: String,
    email1: String,
    email2: String,
    address: String,
    remarks: String
})

module.exports = mongoose.model('User', UserSchema)