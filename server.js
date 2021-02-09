const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const io = require('socket.io')(3100)
const mongoose = require('mongoose')

app.use(bodyParser.json())

const ReadingModel = require('./models/Reading');
const Secrets = require('./secrets');

console.log(Secrets.mongoUri);
