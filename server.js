const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const io = require('socket.io')(3100)
const dialog = require('@google-cloud/dialogflow').v2beta1;
const mongoose = require('mongoose')

const testRoutes = require('./routes/testRoutes');
const readRoutes = require('./routes/readingRoutes');

const Secrets = require('./secrets');

app.use(bodyParser.json());
app.use(testRoutes);
app.use(readRoutes);

mongoose.connect(Secrets.mongoUri, {useNewUrlParser:true, useUnifiedTopology: true})
    .then(message => {
        console.log("Connected to database!");
        app.listen(3200);
    })
    .catch(err => {
        console.log("Error : ",err);
    });