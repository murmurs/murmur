var myDataRef = new Firebase('https://fiery-heat-3376.firebaseio.com/');

exports.insertPost = function(request){
  var post = request.message;
  
  var freshPost = myDataRef.child('Fresh Post');
  
  var message = freshPost.push(); //ID generator
  var messageId = message.key();  //Grabs the ID
  message.set({                   //Pushes the post data into the database
    messageId : messageId,
    message : post,
    timestamp : Firebase.ServerValue.TIMESTAMP,
    votes : 0,
    comments : {}
  });
}