var Firebase = require('firebase');
var myDataRef = new Firebase('https://fiery-heat-3376.firebaseio.com/');
var freshPost = myDataRef.child('Fresh Post');

exports.insertPost = function(request){
  var postMessage = request.message;
  
  var post = freshPost.push();  //ID generator
  var postId = post.key();      //Grabs the ID
  post.set({                    //Pushes the post data into the database
    messageId : messageId,
    message : postMessage,
    timestamp : Firebase.ServerValue.TIMESTAMP,
    votes : 0,
    comments : "no comments"
  });
}

exports.comment = function(request){
  var messageId = request.messageId;      //The post/message ID where the comment resides
  var commentMessage = request.comment;
  
  var comments = freshPost.child(messageId + '/Comments');
  
  var comment = comments.push();  //ID generator
  var commentId = comment.key();  //Grabs the ID
  
  comment.set({                   //Pushes the comment data into the post/message
    commentId : commentId,
    comment : commentMessage,
    votes : 0,
  })
}