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
    // cookie.set('auth', 'AUTHORIZATIONSSSSSS', { // else create Fresh Cookie token
    //   maxAge: 2628000000,   // expires in 1 month
    //   httpOnly: false,    // more secure but then can't access from client
    // })
  }
  next();
})

// var cookieCallback = function (request, response, tokenAuth){
//   app.use(function(request, response, next){
//     console.log('COOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOKIES', tokenAuth)
//     response.cookies.set('token', tokenAuth.token, {
//       maxAge: 2628000000,   // expires in 1 month
//       httpOnly: false,    // more secure but then can't access from client
//     });
//     response.cookies.set('auth', tokenAuth.auth, {
//       maxAge: 2628000000,   // expires in 1 month
//       httpOnly: false,    // more secure but then can't access from client
//     });
//     next();
//   })
// }

app.get('/', function(request, response){
  var cookie = new Cookies(request, response);
  // console.log('Token right before response send',cookie.get('token'))
  response.send(200);
})

app.post('/', function(request, response){ //request.body.url = 'newPost'
           console.log('cookie token', request.cookies.get('token'))
           console.log('tokenAuth', tokenAuth)
           console.log('COOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOKIES')
           var token = request.cookies.get('token');

  var tokenAuth = firebase.insertPost(request, response/*, cookieCallback*/);
  console.log('TOOOOOOOOOOOOOOOKENAUTHHHHHHH', tokenAuth)

           // response.cookies.set('token', tokenAuth.token, {
           //   maxAge: 2628000000,   // expires in 1 month
           //   httpOnly: false,    // more secure but then can't access from client
           // });
           // response.cookies.set('auth', tokenAuth.auth, {
           //   maxAge: 2628000000,   // expires in 1 month
           //   httpOnly: false,    // more secure but then can't access from client
           // });
  // cookieCallback(request, response, token)
  // response.send(201);
})

app.post('/comment', function(request, response){ //request.body.url = 'newPost'
  firebase.comment(request, response);
  response.send(201);
})

app.post('/vote', function(request,response){ //request.body.url = 'newPost'
  firebase.votePost(request, response);
})

app.post('/voteComment', function(request,response){ //request.body.url = 'newPost'
  firebase.voteComment(request, response);
})

app.listen(3000, serverUrl);

