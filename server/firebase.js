var Firebase = require('firebase');
var myDataRef = new Firebase('https://fiery-heat-3376.firebaseio.com/');
var freshPost = myDataRef.child('Fresh Post');

exports.insertPost = function(request, dataRef){
  var dataRef = dataRef || freshPost;
  var postMessage = request.message;
  var post = dataRef.push();  //ID generator
  var postId = post.key();      //Grabs the ID
  post.set({                    //Pushes the post data into the database
    messageId : postId,
    message : postMessage,
    timestamp : Firebase.ServerValue.TIMESTAMP,
    votes : 0,
    comments : "no comments"
  });
}

exports.votePost = function(request, dataRef){
  var dataRef = dataRef || freshPost;
  var messageId = request.messageId;
  var voteRequest = request.vote; //Still waiting for what will the voting be.
  var vote = dataRef.child(messageId + '/votes');

  vote.transaction(function (value){ //Will still change depending on what will the voting be
    if (voteRequest === true){       //But this will work. It will increment the number of votes.
      return value + 1;              //Doesn't have authentication yet
    }
    else {
      return value - 1;
    }
  });
}

exports.comment = function(request, dataRef){
  var dataRef = dataRef || freshPost;
  var messageId = request.messageId;      //The post/message ID where the comment resides
  var commentMessage = request.comment;
  var comments = dataRef.child(messageId + '/comments');

  var comment = comments.push();  //ID generator
  var commentId = comment.key();  //Grabs the ID

  comment.set({                   //Pushes the comment data into the post/message
    commentId : commentId,
    comment : commentMessage,
    timestamp : Firebase.ServerValue.TIMESTAMP,
    votes : 0,
  })
}

exports.voteComment = function(request, dataRef){
  var dataRef = dataRef || freshPost;
  var messageId = request.messageId
  var commentId = request.commentId;
  var voteRequest = request.vote; //Still waiting for what will the voting be.

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
