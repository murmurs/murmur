var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response){
  response.send(200);
})

app.post('/', function(request,response){
  response.send(201);
})

app.listen(8080);
