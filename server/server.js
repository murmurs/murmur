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
var postSchema = new Schema({
  userId: String,
  username: String,
  post: String
});


app.use('/murmur', express.static('../client'));
app.use(bodyParser.json());


//the token needs to be set in order to access firebase.
//this is a crappy function that should be taken out or replaced by something useful.
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

var user = mongoose.model('user', userSchema); //this is basically the users collection.

app.post('/signup', function(request, response){
  var newUser = new user({
    username: request.body.username, 
    password: request.body.password
  });
  newUser.save(function(err, data){
    response.send(data);
  });
});

var post = mongoose.model('post', postSchema);

app.post('/insertPost', function(request, response) {
  var newPost = new post({
    userId: request.body.userId, //this should come from the session.
    username: request.body.username,  //this should come from the session.
    post: request.body.post
  });
  newPost.save(function(err, data){
    response.send(data);
  });
});

app.post('/', function(request, response){
  firebase.insertPost(request, response);
});

app.post('/comment', function(request, response){
  firebase.comment(request, response);
});

app.post('/vote', function(request,response){
  firebase.votePost(request, response);
});

app.post('/voteComment', function(request,response){
  firebase.voteComment(request, response);
});

app.post('/favorite', function(request,response){
  firebase.toggleFavorite(request, response);
});

app.listen(3000, serverUrl);

