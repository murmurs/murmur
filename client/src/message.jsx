var React = require('react');
var moment = require('moment');
var CommentBox = require('./commentBox');
var CommentMessage = require('./commentMessage');

var url = 'http://localhost:8080/';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      commentsView: 'false',
    }
  },
  toggleCommentsView: function(){
    this.setState({ commentsView: !this.state.commentsView })
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

  componentDidMount: function () {
    var component = this;
    setTimeout(function () {
        component.setState({
          commentsView: false,
        });
    });
  },
  render: function() {
    var commentRows = [];
    if(this.props.comments !== 'no comments'){
      for(commentKey in this.props.comments){
        var comments = this.props.comments[commentKey];
        commentRows.push(
          <CommentMessage
            key={ comments.commentId }
            messageId={ this.props.messageId }
            commentId={ comments.commentId }
            commentMessage={ comments.comment }
            commentVotes={ comments.votes }
            commentTimestamp={ comments.timestamp }/>
        );
      }
    }
    var commentRowsSortedOptions = {
      recent: commentRows.slice().sort(function(a,b){
        return b.props.commentTimestamp - a.props.commentTimestamp;
      }),
      popular: commentRows.slice().sort(function(a,b){
        return b.props.commentVotes - a.props.commentVotes;
      }),
    }

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
          alt="View Comments"
          onClick={ this.toggleCommentsView }>
           { this.state.commentsView ? 'hide' : 'show' } comments
        </img>
        <div style={ this.state.commentsView ? this.styles.commentsView : this.styles.hidden }>
          <CommentBox messageId={ this.props.messageId }/>
          { commentRowsSortedOptions['recent'] }
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
      float: "right",
    },
    commentsView: {
      display: "block",
    },
    hidden: {
      display: "none",
    },
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