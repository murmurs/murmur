var express = require('express');
var firebase = require('./firebase');
var tokenFactory = require('./firebaseTokenFactory').tokenFactory;
var app = express();
var bodyParser = require('body-parser');
var Cookies = require("cookies");
var serverUrl = '0.0.0.0';

app.use(express.static('../client'));
app.use(bodyParser.json());

app.use(Cookies.express())

app.use(function(request, response, next){
  var cookie = new Cookies(request, response);
  if(request.cookies.get('token')){  // if there is a Token Cookie
    console.log('request.cookies', request.cookies.get('token'))
  } else {
    response.cookies.set('token', tokenFactory(), { // else create Fresh Cookie token
      maxAge: 2628000000,   // expires in 1 month
      httpOnly: false,    // more secure but then can't access from client
    })
  }
  next();
})

app.get('/', function(request, response){
  response.send(200);
})

app.post('/', function(request, response){ //request.body.url = 'newPost'
  firebase.insertPost(request, response);
})

app.post('/comment', function(request, response){ //request.body.url = 'newPost'
  firebase.comment(request, response);
})

app.post('/vote', function(request,response){ //request.body.url = 'newPost'
  firebase.votePost(request, response);
})

app.post('/voteComment', function(request,response){ //request.body.url = 'newPost'
  firebase.voteComment(request, response);
})

app.listen(3000, serverUrl);

