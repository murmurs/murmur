var express = require('express');
var firebase = require('../database/firebase.js');
var Promise = require('bluebird');
var sanitize = require('./sanitize.js')
var options = require('./authentication.js');
var session = require('express-session');
var FirebaseStore = require('connect-firebase')(session);

var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ 
    extended: true })); 

app.use(session({
  store: new FirebaseStore(options),
  secret: 'No Soup for you',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true,
            maxAge: 1000 * 1000 * 60 * 60 * 24 * 30 //30 days
          }
}))

app.use(express.static('../client'))

app.post('/', function(req, res) {
  //check to see if the sessionId is already in our database
  // if(firebase.checkSessionId(req.session)){}
  //we do not want our request body being ent to the database before
  //it has been sanitized, so we must first wait for the
  //data to be clean be using Promise.resolve on our call to sanitize
    Promise.resolve(sanitize.sanitizeJSON(req.body.message))
        .then(function(data){
          req.body.message = data;
          firebase.insertPost(req.body);
        res.send(data);
      })
      .catch(function(err){
          console.error(err);
          res.sendStatus(404)
      })
});

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);