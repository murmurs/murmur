var React = require('react');
var moment = require('moment');
var CommentBox = require('./commentbox');

var url = 'http://localhost:8080/';

var Message = React.createClass({

  getInitialState: function() {
    return {
      commentBoxDisplay: 'false',
    };
  },

  toggleCommentBoxDisplay: function(){
    this.setState({ commentBoxDisplay: !this.state.commentBoxDisplay });
  },

  // Post upvote data to Firebase
  upVote: function(event){
    var messageId = $(event.target).parent().attr('id');
    $.ajax({
      type: 'POST',
      url: url + 'vote' ,
      contentType: 'application/json',
      data: JSON.stringify({"messageId": messageId, "vote": true}), // true means +1
      success: function(){
      }
    });
  },

  downVote: function(event){
    var messageId = $(event.target).parent().attr('id');
    $.ajax({
      type: 'POST',
      url: url + 'vote' ,
      contentType: 'application/json',
      data: JSON.stringify({"messageId": messageId, "vote": false}),  // false means -1
      success: function(d){
        console.log("POST Vote success", d);
      }
    });
  },

  render: function() {
    return (
      <div className="jumbotron" id={ this.props.messageId } style={{ borderRadius: '40px', paddingLeft: '14px', paddingRight: '14px', paddingTop: '25px', paddingBottom: '25px', backgroundColor: '#ECF0F5'}} >
        <div className="container">
          <div className="col-xs-10" style={{ marginBottom: '20px'}}>
            <p style={{fontFamily: 'Roboto', color: 'chocolate', marginLeft: "10px"}}>
              { this.props.message }
            </p>
          </div>
          <div className="votes col-xs-2" style={ this.styles.votes }>
            <div style={ this.styles.voteContainer }>
              <img src="./src/img/glyphicons-601-chevron-up.png" style={ this.styles.arrows } alt="Up Vote" onClick={ this.upVote }/>
              <span className="count"  style={ this.styles.voteCount }> { this.props.votes } </span>
              <img src="./src/img/glyphicons-602-chevron-down.png" style={ this.styles.arrows } alt="Down Vote" onClick={ this.downVote }/>
            </div>
          </div>
          <div className="col-xs-12">
            <div style={ this.styles.timestamp }>
              <img style={ this.styles.iconStyle } src="./src/img/clock.png"/>
              <span style={{fontStyle: "italic"}}>
                { moment(this.props.timestamp).fromNow() }
              </span>
            </div>
            <div style={ this.styles.comments }>
              <img style={ this.styles.iconStyle } src="./src/img/comments.png"/>
              <span style={{fontStyle: "italic"}}> 24 comments </span>
            </div>
          </div>
        </div>
      </div>
    )
  },

  styles: {
    timestamp: {
      float: "left"
    },
    votes: {
      float: "right",
      fontSize: "19px",
    },
    comments: {
      float: "left"
    },
    commentButton: {
      position: "relative",
      top: "-3px"
    },
    voteContainer: {
      width: "20px",
      float: "right"
    },
    voteCount: {
      margin: 'auto'
    },
    iconStyle: {
      marginLeft: "10px",
      marginRight: "10px",
    },
    arrows: {
      // float: "right"
    }
  }
});

module.exports = Message;
