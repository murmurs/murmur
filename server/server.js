var express = require('express');
var firebase = require('./firebase');
var tokenFactory = require('./firebaseTokenFactory').tokenFactory;
var app = express();
var bodyParser = require('body-parser');
var Cookies = require("cookies");
var serverUrl = '0.0.0.0';
var fs = require('fs')

app.use('/murmur', express.static('../client'));
app.use(bodyParser.json());

app.use(Cookies.express())

app.get('/noToken', function(request, response){
  fs.readFile('../client/src/invite.html', function(err, data){
    if(err){
      console.log('error reading invite.html')
    }
    response.setHeader('Content-Type', 'text/html')
    response.send(data)
  })
})

app.post('/noToken', function(request, response){
  if(request.cookies.get('token')){
    console.log('already have a token')
    request.method = 'get';
    // response.redirect('/murmur');
    response.send({redirect: '/murmur'});
  } else if(request.body.inviteCode === 'mks22'){                   // set Token Cookie
    response.cookies.set('token', tokenFactory(), {
      maxAge: 2628000000,   // expires in 1 month
      httpOnly: false,    // more secure but then can't access from client
    })
    request.method = 'get';
    response.send({redirect: '/murmur'});
  } else {
    response.send('Correct Invitation Code Required.')
  }
})

app.get('/', function(request, response){
  if(request.cookies.get('token')){
    response.redirect('/murmur');
  } else {
    console.log('no token redirect')
    response.redirect('/noToken');
  }
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

app.post('/favorite', function(request,response){ //request.body.url = 'newPost'
  firebase.toggleFavorite(request, response);
})

app.listen(3000, serverUrl);

