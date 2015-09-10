var Firebase = require('firebase');
var myDataRef = new Firebase('https://fiery-heat-3376.firebaseio.com/');
var sessionStorage = myDataRef.child('sessions');
var freshPost = myDataRef.child('Fresh Post');

//this function is used to check is the session ID already exists in our DB
//Up to you to chose how you want to implement it
exports.checkSessionId = function(sessId, cb){
  //if sessionId is in our storage, return true
  //else return false
  sessionStorage.child(sessId).once('value', function(snapshot){
  	if(snapshot.val() === null){
  		return false;
  	}
  	return true;
  })
}