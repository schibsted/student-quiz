'use strict';

var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    path = require('path'),
    mongoose = require('mongoose'),
    answerSchema = require('./models/answer.js');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGOHQ_URL || 'sppvm', 'arkad');
var answer = mongoose.model('Answer', answerSchema);

app.get('/', function(req, res) {
    res.render('index', { title: 'ARKAD Quiz' });
});

app.post('/', function(req, res) {
    console.log(req.body);
    answer.create(req.body);
    res.render('thanks', { title: 'Thanks!' })
});

var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port %d', server.address().port);
});
