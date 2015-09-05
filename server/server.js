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


// app.post('/', function(request,response){ //request.body.url = 'newPost'
app.post('/user', function(request,response){ //request.body.url = 'newPost'
  //validate the request body for any XSS attacks
  console.log('consoling in post request')
  validator.escape(request.body).then(function(requestBody){
  	firebase.insertPost(requestBody);
  }).then(function(data){
  	response.writeHead(201)
  	response.end();
  }).catch(function(err){
  	console.error(err);
  	response.sendStatus(404);
  })
})


app.listen(8080);
