const express = require("express");
const router = express.Router();
const read = require("../models/Reading.js")
const user = require('../models/User')


//var value = new read({value : 10})

// URL      - /add
//          - Add a reading to the database

router.post('/add/user', (req, res) => {
  var data = new user({
    ...req.body
  });
  console.log(req.body)
  data.save().then(_ =>{
    return res.json({
      message: 'insertion success!',
      data: data
    })
  })
  .catch(err => {
    return res.json({
      message: 'insertion failed',
      error: err
    })
  })
})


router.post('/add', (req, res) => {
    
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


router.get('/fetch/user', (req, res) => {
  const data = user.find().sort({_id : 1}).then( result => {
    return res.json(result);
});
})

router.get('/fetch',(req, res, n)=>{
    const values = read.find().sort({_id : 1}).limit(n).then( result => {
        return res.json(result);
    });
})



module.exports = router;