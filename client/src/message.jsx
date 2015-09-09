var React = require('react');
<<<<<<< HEAD
var moment = require('moment');
var CommentBox = require('./commentbox');
=======
>>>>>>> [feat] update to voteMessage

var url = 'http://localhost:8080/';

module.exports = React.createClass({
<<<<<<< HEAD
  getInitialState: function() {
    return {
      commentBox: 'false',
    }
  },
  toggleCommentBox: function(){
    this.setState({ commentBox: !this.state.commentBox })
  },
=======
>>>>>>> [feat] update to voteMessage
  upVote: function(event){
    var messageId = $(event.target).parent().attr('id');
    $.ajax({
      type: 'POST',
<<<<<<< HEAD
      url: url + 'vote' ,
=======
      url: url + 'Vote' ,
>>>>>>> [feat] update to voteMessage
      contentType: 'application/json',
      data: JSON.stringify({"messageId": messageId, "vote": true}),
      success: function(){
      }
    })
  },
  downVote: function(event){

    var messageId = $(event.target).parent().attr('id');
    $.ajax({
      type: 'POST',
<<<<<<< HEAD
      url: url + 'vote' ,
      contentType: 'application/json',
      data: JSON.stringify({"messageId": messageId, "vote": false}),
      success: function(d){
        console.log("POST Vote success", d)
      }
    })
=======
      url: url + 'Vote' ,
      contentType: 'application/json',
      data: JSON.stringify({"messageId": messageId, "vote": false}),
      success: function(){
      }
    })

>>>>>>> [feat] update to voteMessage
  },
  render: function() {
    return (
      <div className="jumbotron" id={ this.props.messageId }>
<<<<<<< HEAD
        <img src="./src/img/glyphicons-601-chevron-up.png" style={ this.styles.arrows } alt="Up Vote" onClick={ this.upVote }/>
        <img src="./src/img/glyphicons-602-chevron-down.png" style={ this.styles.arrows } alt="Down Vote" onClick={ this.downVote }/>
        <div style={ this.styles.votes }>
          { this.props.votes }
        </div>
=======
>>>>>>> [feat] update to voteMessage
        <div style={ this.styles.messageBox }>
          { this.props.message }
        </div>
        <div style={ this.styles.timestamp }>
<<<<<<< HEAD
          { moment(this.props.timestamp).fromNow() }
        </div>
        <img src="./src/img/glyphicons-151-edit.png"
          alt="Post a Comment"
          onClick={ this.toggleCommentBox }
          style={ this.styles.writeButton }/>
        { this.state.commentBox ? <CommentBox messageId={ this.props.messageId }/> : <div/>}
=======
          { this.props.timestamp }
        </div>
        <div style={ this.styles.votes }>
          { this.props.votes }
        </div>
        <img src="./src/img/glyphicons-151-edit.png" alt="Post a Message" style={{float: "right", position: "relative", top: "4px"}}/>
        <img src="./src/img/glyphicons-601-chevron-up.png" alt="Up Vote" onClick={ this.upVote }/>
        <img src="./src/img/glyphicons-602-chevron-down.png" alt="Down Vote" onClick={ this.downVote }/>
>>>>>>> [feat] update to voteMessage
      </div>
    )
  },
  styles: {
    messageBox: {
    },
    timestamp: {
    },
    votes: {
<<<<<<< HEAD
      float: "right",
      fontSize: "30px",
    },
    writeButton: {
      float: "left",
      position: "relative",
      top: "4px"
    },
    arrows: {
      float: "right"
    }
=======
    },
>>>>>>> [feat] update to voteMessage
  }
});

// #yakApp .yak {
//     position: relative;
//     background: #fff;
//     min-height: 200px;
//     padding: 20px;
// }

// .row {
//     margin-left: -15px;
//     margin-right: -15px;
// }
// .row:after {
//     content: " ";
//     display: table;
// }
