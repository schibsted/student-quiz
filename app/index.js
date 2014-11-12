'use strict';

if (process.env.NODE_ENV === 'production') {
    require('newrelic');
}

var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    csrf = require('csurf'),
    cookieParser = require('cookie-parser'),
    path = require('path'),
    mongoose = require('mongoose'),
    answerSchema = require('./models/answer.js');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(csrf({ cookie:true }));

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://sppvm/arkad');
var answer = mongoose.model('Answer', answerSchema);

app.get('/', function(req, res) {
    res.render('index', { title: 'ARKAD Quiz', csrfToken: req.csrfToken() });
});

app.post('/', function(req, res) {
    console.log(req.body);
    answer.create(req.body, function(err, result) {
        if(!err) {
            return res.render('thanks', { title: 'Thanks!' });
        }
        return res.render('error', 'Something went wrong...');
    });
});

app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') {
        return next(err);
    }
    console.warn('Bad CSRF token');
    res.render('error', { title: 'Something went wrong...'});
});

var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port %d', server.address().port);
});
