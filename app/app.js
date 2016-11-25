var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var elastic = require('./service/elasticsearch');

var index = require('./routes/index');
var logs = require('./routes/logs');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/logs', logs);
app.use('/', index);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/* create the index if it doesn't exist */
elastic.indexExists().then(function (exists) {
  if (!exists) {
    return elastic.createIndex().then(elastic.initialize)
  }
});


app.listen(9000, function() {
});

module.exports = app;