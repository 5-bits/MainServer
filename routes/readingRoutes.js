const express = require("express");
const router = express.Router();
const read = require("../models/Reading.js")
//var value = new read({value : 10})

// URL      - /add
//          - Add a reading to the database
router.post('/add', (req, res) => {
    console.log("Body : ", req.body);
    var value = new read({ value : req.body });
    value.save().then( result => {
        console.log("value added !");
        
    })
    .catch( err => {
        console.log(err)
    })
    return res.json({
        message : "Received",
        value : value
    })
}) 

router.get('/fetch',(req, res)=>{
    return res.json({
        message : 'get works!!'
    });
})

module.exports = router;