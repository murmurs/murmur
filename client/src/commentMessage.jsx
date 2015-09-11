var React = require('react');
var moment = require('moment');
var Face = require('./face');

var url = 'http://localhost:8080/';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      commentBox: 'false',
    }
  },
  upVote: function(event){
    var commentId = $(event.target).parent().attr('id');
    console.log('fire up', this.props.messageId, commentId, event.target)
    console.log('target', $(event.target).parent())
    $.ajax({
      type: 'POST',
      url: url + 'voteComment' ,
      contentType: 'application/json',
      data: JSON.stringify({
        "messageId": this.props.messageId,
        "commentId": commentId,
        "vote": true,
      }),
      success: function(){
      }
    })
  },
  downVote: function(event){

    var commentId = $(event.target).parent().attr('id');
    $.ajax({
      type: 'POST',
      url: url + 'voteComment' ,
      contentType: 'application/json',
      data: JSON.stringify({
        "messageId": this.props.messageId,
        "commentId": commentId,
        "vote": false,
      }),
      success: function(){
      }
    })
  },
  render: function() {
    return (
      <div id={ this.props.commentId } className="jumbotron" key={ this.props.commentId }>
        <Face base={ 11 } hair={ 29 } key={ this.props.commentId } />
        <img src="./src/img/glyphicons-601-chevron-up.png" style={ this.styles.arrows } alt="Up Vote" onClick={ this.upVote }/>
        <img src="./src/img/glyphicons-602-chevron-down.png" style={ this.styles.arrows } alt="Down Vote" onClick={ this.downVote }/>
        <div style={ this.styles.votes }>
          { this.props.commentVotes }
        </div>
        <div style={ this.props.messageBox }>
          { this.props.commentMessage }
        </div>
        <div style={ this.styles.timestamp }>
          { moment(this.props.commentTimestamp).fromNow() }
        </div>
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
