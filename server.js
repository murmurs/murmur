var express = require('express');
var firebase = require('./firebase');
var bodyParser = require('bodyParser');
var sessions = require('express-session');
var Promise = require('bluebird');
var validator = Promise.promisifyAll(require('validator'));

var app = express();
//middle-ware to parse the body of each request to our server
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response){
  response.send(200);
})

app.post('/', function(request,response){ //request.body.url = 'newPost'
  //validate the request body for any XSS attacks
  validator.escape.(request.body).then(function(requestBody){
  	firebase.insertPost(requestBody);
  }).then(function(data){
  	response.send(201, data);
  }).catch(function(err){
  	console.error(err);
  	response.send(404);
  })
})

app.listen(8080);
