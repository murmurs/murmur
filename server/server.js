var express = require('express');
var firebase = require('./firebase');
var bodyParser = require('body-parser');
var sessions = require('express-session');
var Promise = require('bluebird');
var validator = Promise.promisifyAll(require('validator'));

var app = express();
//middle-ware to parse the body of each request to our server
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('./public'));

app.post('/comment', function(request,response){ //request.body.url = 'newPost'
  firebase.comment(request.body);
})


app.post('/voteComment', function(request,response){ //request.body.url = 'newPost'
  firebase.voteComment(request.body);
  response.send(201);
})

app.listen(8080);
