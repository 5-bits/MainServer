const mongoose = require('mongoose')

const ReadingSchema = mongoose.Schema({
    value: Number
})

module.exports = mongoose.model('Readings',ReadingSchema)