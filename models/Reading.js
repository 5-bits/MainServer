const mongoose = require('mongoose')

const ReadingSchema = mongoose.Schema({
    name: String,
    value: Number
})

module.exports = mongoose.model('Readings',ReadingSchema)