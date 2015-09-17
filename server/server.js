var express = require('express');

var app = express();
var bodyParser = require('body-parser');
var serverUrl = '0.0.0.0';

//hopefully these can be removed soon... 
var Cookies = require("cookies");
app.use(Cookies.express())
var firebase = require('./firebase');
var tokenFactory = require('./firebaseTokenFactory').tokenFactory;

//MONGO BABY!
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/geoChat');
var db = mongoose.connection;
//verify connection.
db.once('open', function callback () {
  console.log('Conntected To Mongo Database');
});

var Schema = mongoose.Schema;
var userSchema = new Schema({
  username: String,
  password: String
});

var user = mongoose.model('user', userSchema); //this is basically the users collection.

var newUser = new user({username: "Dylan", password: "pw"});
newUser.save(function(err, data) {
  console.log("newUser data", data);
});

user.find(null, function(err, data){
  console.log(">>>> " + data );
});

app.use('/murmur', express.static('../client'));
app.use(bodyParser.json());




// this is no longer needed
// app.get('/noToken', function(request, response){
//   fs.readFile('../client/src/invite.html', function(err, data){
//     if(err){
//       console.log('error reading invite.html')
//     }
//     response.setHeader('Content-Type', 'text/html')
//     response.send(data)
//   })
// });

//These are no longer needed because we will no longer be posting a token.
// app.post('/noToken', function(request, response){
//   if(request.cookies.get('token')){
//     console.log('already have a token')
//     request.method = 'get';
//     // response.redirect('/murmur');
//     response.send({redirect: '/murmur'});
//   } else if(request.body.inviteCode === 'mks22'){  // set Token Cookie
//     response.cookies.set('token', tokenFactory(), {
//       maxAge: 2628000000,   // expires in 1 month
//       httpOnly: false,    // more secure but then can't access from client
//     })
//     request.method = 'get';
//     response.send({redirect: '/murmur'});
//   } else {
//     response.send('Correct Invitation Code Required.')
//   }
// })

//the token needs to be set in order to access firebase.
app.get('/', function(request, response){
  if(request.cookies.get('token')){
    console.log('already have a token')
    request.method = 'get';
    response.redirect('/murmur');
    //response.send({redirect: '/murmur'});
  } else {  // set Token Cookie
    response.cookies.set('token', tokenFactory(), {
      maxAge: 2628000000,   // expires in 1 month
      httpOnly: false,    // more secure but then can't access from client
    })
    request.method = 'get';
    response.send({redirect: '/murmur'});
  }
});

app.post('/signup', function(request, response){
  var newUser = new user({username: request.body.username, password: request.body.password});
  newUser.save(function(err, data){
    response.send(data);
  });
});

app.post('/', function(request, response){
  firebase.insertPost(request, response);
})

app.post('/comment', function(request, response){
  firebase.comment(request, response);
})

app.post('/vote', function(request,response){
  firebase.votePost(request, response);
})

app.post('/voteComment', function(request,response){
  firebase.voteComment(request, response);
})

app.post('/favorite', function(request,response){
  firebase.toggleFavorite(request, response);
})

app.listen(3000, serverUrl);

