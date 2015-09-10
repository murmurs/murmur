var Firebase = require('firebase');
var myDataRef = new Firebase('https://fiery-heat-3376.firebaseio.com/');
var freshPost = myDataRef.child('Fresh Post');

exports.insertPost = function(request, callback){
  var postMessage = request.message;
  
  var post = freshPost.push();  //ID generator
  var postId = post.key();      //Grabs the ID
  post.set({                    //Pushes the post data into the database
    messageId : postId,
    message : postMessage,
    timestamp : Firebase.ServerValue.TIMESTAMP,
    comments : "no comments",
    totalComments: 0,
    voterId: "no voters yet",
    votes : 0,
  });

  callback();
}

exports.comment = function(request, callback){
  var messageId = request.messageId;      //The post/message ID where the comment resides
  var commentMessage = request.comment;
  
  var comments = freshPost.child(messageId + '/comments');
  
  var comment = comments.push();  //ID generator
  var commentId = comment.key();  //Grabs the ID
  
  comment.set({                   //Pushes the comment data into the post/message
    commentId : commentId,
    comment : commentMessage,
    timestamp : Firebase.ServerValue.TIMESTAMP,
    voterId: "no voters yet",
    votes : 0,
  })

  updateCommentTotal(messageId, commentId);
  callback();
}

exports.voteComment = function(request){
  var messageId = request.messageId
  var commentId = request.commentId;
  var voteRequest = request.vote; //Still waiting for what will the voting be.
  
  var vote = freshPost.child(messageId + '/comments/' + commentId + '/votes');
  
  vote.transaction(function (value){ //Will still change depending on what will the voting be
    if (voteRequest === true){       //But this will work. It will increment the number of votes.
      return value + 1;              //Doesn't have authentication yet
    }
    else {
      return value - 1;
    }
  });
}

//this function keeps a updates the comment total, whenever a 
//comment is added
exports.updateCommentTotal = function(messageId, commentId){

  var commentTotal = freshPost.child(messageId + '/totalComments');
  commentTotal.transaction(function (value){
    if(commentId){
      return value + 1
    }
  })
}

