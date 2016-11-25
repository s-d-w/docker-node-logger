var express = require('express');
var router = express.Router();

var elastic = require('../service/elasticsearch');

router.get('/', function (req, res, next) {
    elastic.getLogs(req.query.q, req.query.page, req.query.amount)
        .then(function (result) { 
            res.json(result)
        });
});

router.post('/', function (req, res, next) {
    elastic.addLog(req.body, req.ip, req.headers.host)
        .then(function (result) { 
            res.json(result) 
        });
});

module.exports = router;