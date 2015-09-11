var express = require('express');
var firebase = require('../database/firebase.js');
var Promise = require('bluebird');
var sanitize = require('./utils/sanitize.js')
var authenticate = require('./utils/authenticate.js'); //implementation is up to you
var session = require('express-session');
var sessionStoreDB = require('./utils/sessionStoreDB.js')
var FirebaseStore = require('connect-firebase')(session);
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 8080;
var store = new FirebaseStore(sessionStoreDB.options)

//MIDDLEWARES
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ 
    extended: true })); 

//this middleware attach a session ID to each user
//we can then use this ID to make decision on authentication
//accessibility and voter accountability (how many times the can vote
//and any given message);


app.use(session({
  store: store,
  secret: 'No Soup for you',
  rolling: false,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true,
            httpOnly: true, 
            maxAge: 2592000000 //30 days
          }
}))

//this middleware server our statis files from the client folder
app.use(express.static('../client'))

app.post('/', function(req, res) {

  //we do not want our request body being sent to the database before
  //it has been sanitized (cleared or any script attacks), 
  //so we must first wait for the data to be cleaned by using 
    //Promise.resolve on our call to sanitize the data

  Promise.resolve(sanitize.sanitizeJSON(req.body.message))
    .then(function(data){
      //whatever data comes back from the promise call is what
      //we will attach to the request message property
      req.body.message = data;
      firebase.insertPost(req.body, function(code){
        res.sendStatus(code);
      });
    })
    .catch(function(err){
        console.error('INSIDE THE POST', err);
        res.sendStatus(404)
    })
});

app.post('/vote', function(req, res){

  firebase.votePost(req.sessionID, req.body, function(code){
    res.sendStatus(code);
  });
})

app.post('/comment', function(req, res){
  //the same exact logic for the message only this time for 
  //the comments on each message
  Promise.resole(sanitize.sanitizeJSON(req.body.comment))
    .then(function(data){
      req.body.comment = data;
      firebase.comment(req.body, function(code){
        res.sendStatus(code);
      })
    })
    .catch(function(err){
        console.error('INSIDE THE POST', err);
        res.sendStatus(404)
    })
})

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);