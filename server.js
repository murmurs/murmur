var express = require('express');
var firebase = require('./firebase');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response){
  response.send(200);
})

app.post('/', function(request,response){ //request.body.url = 'newPost'
  firebase.insertPost(request.body);
  response.send(201);
})

app.listen(8080);
