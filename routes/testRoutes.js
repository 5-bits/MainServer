const express = require('express');
const router = express.Router();

// URL      - /test
//          - A simple test route to check connection
router.get('/test', (req, res) => {
    return res.json({
        message : "Server working"
    })
});

module.exports = router;