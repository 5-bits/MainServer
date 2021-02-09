const express = require("express");
const router = express.Router();

// URL      - /add
//          - Add a reading to the database
router.post('/add', (req, res) => {
    console.log("Body : ", req.body);
    return res.json({
        message : "Received"
    });
})

module.exports = router;