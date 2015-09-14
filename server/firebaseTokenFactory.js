var FirebaseTokenGenerator = require("firebase-token-generator");
var tokenGenerator = new FirebaseTokenGenerator('t2kSNyDUP3YhTCXWwroaTnworNSulqfCCTTU4T8x');
// var uidTracker = 0;

var guid = function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

function randomFromInterval(from,to){ return Math.floor(Math.random()*(to-from+1)+from); };

var tokenFactory = exports.tokenFactory = function(optionsObject){
  var tokenPayload
  if(optionsObject && optionsObject.uid){ // Modify Old Session Token
    tokenPayload = optionsObject;
  } else{ // New Session Token
    var baseId = randomFromInterval(1,18);
    var hairId = randomFromInterval(1,99);
    // todo: set guid() to firebase push generated key
    tokenPayload = {
      uid: guid(),
      likedMessagesId: [],
      postedMessagesId : 0,
      votedMessagesId: [],
      baseId: baseId,
      hairId: hairId,
    }
  }

  var token = tokenGenerator.createToken(tokenPayload);
  return token;
}


var Firebase = require('firebase');
var myDataRef = new Firebase('https://fiery-heat-3376.firebaseio.com/');
var freshPost = myDataRef.child('Fresh Post');

myDataRef.authWithCustomToken(tokenFactory(), function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Login Succeeded!", authData);
    console.log("Login Succeeded!", authData.token);
  }
});
