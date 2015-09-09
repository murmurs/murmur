var React = require('react');
var moment = require('moment');
var CommentBox = require('./commentBox');

var url = 'http://localhost:8080/';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      commentBox: 'false',
    }
  },
  toggleCommentBox: function(){
    this.setState({ commentBox: !this.state.commentBox })
  },
  upVote: function(event){
    var messageId = $(event.target).parent().attr('id');
    $.ajax({
      type: 'POST',
      url: url + 'vote' ,
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
      url: url + 'vote' ,
      contentType: 'application/json',
      data: JSON.stringify({"messageId": messageId, "vote": false}),
      success: function(){
      }
    })
  },
  render: function() {
    return (
      <div className="jumbotron" id={ this.props.messageId }>
        <img src="./src/img/glyphicons-601-chevron-up.png" style={ this.styles.arrows } alt="Up Vote" onClick={ this.upVote }/>
        <img src="./src/img/glyphicons-602-chevron-down.png" style={ this.styles.arrows } alt="Down Vote" onClick={ this.downVote }/>
        <div style={ this.styles.votes }>
          { this.props.votes }
        </div>
        <div style={ this.styles.messageBox }>
          { this.props.message }
        </div>
        <div style={ this.styles.timestamp }>
          { moment(this.props.timestamp).fromNow() }
        </div>
        <img src="./src/img/glyphicons-151-edit.png"
          alt="Post a Comment"
          onClick={ this.toggleCommentBox }
          style={ this.styles.writeButton }/>
        { this.state.commentBox ? <CommentBox messageId={ this.props.messageId }/> : <div/>}
      </div>
    )
  },
  styles: {
    messageBox: {
    },
    timestamp: {
    },
    votes: {
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
