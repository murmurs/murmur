var express = require('express');
var firebase = require('./firebase');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('../client'));
app.use(bodyParser.json());

app.get('/', function(request, response){
  response.send(200);
})

app.post('/', function(request,response){ //request.body.url = 'newPost'
  firebase.insertPost(request.body);
  response.send(201);
})

app.listen(8080);
