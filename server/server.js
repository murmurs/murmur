var express = require('express');
var firebase = require('./firebase');
var tokenFactory = require('./firebaseTokenFactory').tokenFactory;
var app = express();
var bodyParser = require('body-parser');
var Cookies = require("cookies");

app.use(express.static('../client'));
app.use(bodyParser.json());

// app.use(function (request, response, next) {
  // check if client sent cookie
  // var token = request.cookies.token;
  // if (token === undefined)
  // { // no: set a new cookie
  //   response.cookie('token', tokenFactory(), {
  //     maxAge: 2628000000,
  //     httpOnly: true
  //   });
  //   console.log('token created successfully');
  // }
  // else
  // { // yes, cookie was already present
  //   console.log('token exists', token);
  // }
  // request.cookies = 'foobar'
  // next(); // <-- important!
// });

app.use(function(request, response, next){
  var cookie = new Cookies(request, response)
  var token = cookie.get('token')
  if(cookie.get('token')){  // if No Token Cookie yet
  } else {
    cookie.set('token', tokenFactory(), { // Create Fresh Cookie token
      maxAge: 2628000000,   // expires in 1 month
      httpOnly: true,
    })
  }
  next();
})

app.get('/', function(request, response){
  response.send(200);
})

app.post('/', function(request,response){ //request.body.url = 'newPost'
  firebase.insertPost(request);
  response.send(201);
})

app.post('/comment', function(request,response){ //request.body.url = 'newPost'
  firebase.comment(request);
  response.send(201);
})

app.post('/vote', function(request,response){ //request.body.url = 'newPost'
  firebase.votePost(request);
  response.send(201);
})

app.post('/voteComment', function(request,response){ //request.body.url = 'newPost'
  firebase.voteComment(request);
  response.send(201);
})

app.listen(8080);
