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
        //console.log("value added !");
        return res.json({
            message : "insertion success !",
            value : value
        })
        
    })
    .catch( err => {
        //console.log(err)
        return res.json({
            message : 'insertion failed',
            error : err
        })
    })
}) 

router.get('/fetch',(req, res, n)=>{
    const values = read.find().sort({_id : 1}).limit(n).then( result => {
        return res.json(result);
    });
})

module.exports = router;