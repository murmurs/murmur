var Firebase = require('firebase');
var myDataRef = new Firebase('https://fiery-heat-3376.firebaseio.com/');
var tokenFactory = require('./firebaseTokenFactory').tokenFactory
var Cookies = require('cookies');

var freshPost = myDataRef.child('Fresh Post');

var setTokenCookie = function (request, response, token){
    if(token !== undefined){
      newToken = token;
    }
    response.cookies.set('token', newToken, {
      maxAge: 2628000000,   // expires in 1 month
      httpOnly: false,    // more secure but then can't access from client
    });

    response.sendStatus(201)
}

var insertPost = exports.insertPost = function(request, response, dataRef){
  var dataRef = dataRef || freshPost;
  var token = request.cookies.get('token')
  var newToken;
  var newJwtClaims;

  if(token){
    dataRef.authWithCustomToken(token, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Login Succeeded in firebase!", authData);
        var postMessage = request.body.message;
        var post = dataRef.push();  //ID generator
        var postId = post.key();      //Grabs the ID
        post.set({                    //Pushes the post data into the database
          uid: authData.auth.uid,
          messageId : postId,
          message : postMessage,
          timestamp : Firebase.ServerValue.TIMESTAMP,
          votes : 0,
          comments : "no comments"
        })
        // turn auth data
        // authData.auth.postedMessagesId = authData.auth.postedMessagesId.concat([postId])

        newJwtClaims = authData.auth;
        console.log('original postemdMessagesId', newJwtClaims.postedMessagesId)
        newJwtClaims.postedMessagesId = newJwtClaims.postedMessagesId + 1;
        newToken = tokenFactory(newJwtClaims);
        console.log(newJwtClaims.postedMessagesId);
        console.log('the new AUTH !!!!!!: ', newJwtClaims)
        console.log('the new token !!!!!!: ', newToken)
        // var cookie = new Cookie(request, response)
        // callback(request, response, { token: newToken, auth: newJwtClaims })
        console.log('Tooooooooooooooooooooooooken inside POOOST', newToken)
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAUTH inside POOOST', newJwtClaims)
        // response.cookies.set('token', newToken, {
        //   maxAge: 2628000000,   // expires in 1 month
        //   httpOnly: false,    // more secure but then can't access from client
        // });
        // response.cookies.set('auth', newJwtClaims, {
        //   maxAge: 2628000000,   // expires in 1 month
        //   httpOnly: false,    // more secure but then can't access from client
        // });
        // response.send(201)
        // cookieCallback(request, response, newToken, newJwtClaims.uid)
        setTokenCookie(request, response, newToken)
      }
    });
  }

  return { newToken: newToken, auth: newJwtClaims }
}

var votePost = exports.votePost = function(request, response, dataRef){

  var dataRef = dataRef || freshPost;
  var token = request.cookies.get('token');
  var newToken;
  var newJwtClaims;

  if(token){

    dataRef.authWithCustomToken(token, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        // console.log("Login Succeeded!", authData);
        var dataRef = dataRef || freshPost;
        var messageId = request.body.messageId;
        var voteRequest = request.body.vote; //Still waiting for what will the voting be.
        var vote = dataRef.child(messageId + '/votes');

        vote.transaction(function (value){ //Will still change depending on what will the voting be
          if (voteRequest === true){       //But this will work. It will increment the number of votes.
            return value + 1;              //Doesn't have authentication yet
          }
          else {
            return value - 1;
          }
        });

        newJwtClaims = authData.auth;
        console.log('original postemdMessagesId', newJwtClaims.postedMessagesId)
        newJwtClaims.postedMessagesId = newJwtClaims.postedMessagesId + 1;
        newToken = tokenFactory(newJwtClaims);

        setTokenCookie(request, response, newToken)
      }
    });

  } else {
    response.sendStatus(404)  // look up right error code later
  }

}

var comment = exports.comment = function(request, dataRef){
  var dataRef = dataRef || freshPost;
  var token = request.body.token;

  dataRef.authWithCustomToken(token, function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      // console.log("Login Succeeded!", authData);
      var messageId = request.body.messageId;      //The post/message ID where the comment resides
      var commentMessage = request.body.comment;
      var comments = dataRef.child( messageId + '/comments');

      var comment = comments.push();  //ID generator
      var commentId = comment.key();  //Grabs the ID

      comment.set({                   //Pushes the comment data into the post/message
        commentId : commentId,
        comment : commentMessage,
        timestamp : Firebase.ServerValue.TIMESTAMP,
        votes : 0,
        baseId: authData.auth.baseId,
        hairId: authData.auth.hairId,
      })
    }
  });
}

var voteComment = exports.voteComment = function(request, dataRef){
  var dataRef = dataRef || freshPost;
  var token = request.body.token;
  dataRef.authWithCustomToken(token, function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      // console.log("Login Succeeded!", authData);
      var messageId = request.body.messageId
      var commentId = request.body.commentId;
      var voteRequest = request.body.vote; //Still waiting for what will the voting be.

      var vote = dataRef.child(messageId + '/comments/' + commentId + '/votes');

      vote.transaction(function (value){ //Will still change depending on what will the voting be
        if (voteRequest === true){       //But this will work. It will increment the number of votes.
          return value + 1;              //Doesn't have authentication yet
        }
        else {
          return value - 1;
        }
      });

    }
  });
}
