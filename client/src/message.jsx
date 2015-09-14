var React = require('react');
var moment = require('moment');
var CommentBox = require('./commentBox');
var CommentMessage = require('./commentMessage');

var url = 'http://107.170.240.99:4000/';

var Message = React.createClass({
  getInitialState: function() {
    return {
      commentsView: 'false',
    }
  },
  toggleCommentsView: function(){
    this.setState({ commentsView: !this.state.commentsView })
  },
  // Post upvote data to Server
  upVote: function(event){
    var messageId = $(event.target).closest('.jumbotron').attr('id');
    $.ajax({
      type: 'POST',
      url: url + 'vote' ,
      contentType: 'application/json',
      data: JSON.stringify({
        "messageId": messageId,
        "vote": true,
        "token": this.props.token
      }),
      success: function(){
      }
    })
  },
  // Post downvote data to Server
  downVote: function(event){

    var messageId = $(event.target).closest('.jumbotron').attr('id');
    $.ajax({
      type: 'POST',
      url: url + 'vote' ,
      contentType: 'application/json',
      data: JSON.stringify({
        "messageId": messageId,
        "vote": false,
        "token": this.props.token
      }),
      success: function(){
      }
    })
  },

  toggleFavorite: function(event){

    var messageId = $(event.target).closest('.jumbotron').attr('id');
    $.ajax({
      type: 'POST',
      url: url + 'favorite' ,
      contentType: 'application/json',
      data: JSON.stringify({
        "messageId": messageId,
        "token": this.props.token
      }),
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
            token={ this.props.token }
            auth={ this.props.auth }
            messageId={ this.props.messageId }
            commentId={ comments.commentId }
            commentMessage={ comments.comment }
            commentVotes={ comments.votes }
            commentTimestamp={ comments.timestamp }
            baseId={ comments.baseId }
            hairId={ comments.hairId } />
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

    var commentNumber = this.props.comments !== 'no comments' ?
      Object.keys(this.props.comments).length :
      'no ';

                    // 119{ commentNumber } comments
    return (
      <div className="jumbotron" id={ this.props.messageId } style={{ borderRadius: '40px', paddingLeft: '0', paddingRight: '0', paddingTop: '15px', paddingBottom: '7px', backgroundColor: '#ECF0F5'}} >
        <div className="container">
          <div className="col-xs-10" style={{ marginBottom: '20px', paddingLeft:'10px', marginBottom: '0'}}>
            <p style={{fontFamily: 'Roboto', color: 'chocolate', marginLeft: "10px", marginBottom: '0'}}>
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
          <div className="col-xs-12" style={{paddingLeft:'10px'}}>
            <div style={ this.styles.timestamp }>
              <img style={ this.styles.iconStyle } src="./src/img/clock.png"/>
              <span style={{fontStyle: "italic", fontSize: '.8em'}}>
                { moment(this.props.timestamp).fromNow() }
              </span>
            </div>
            <div style={ this.styles.comments }>
              <div className="commentViewToggle" onClick={ this.toggleCommentsView }>
                <img style={ this.styles.iconStyle } src="./src/img/comments.png"/>
                <span style={ {float: "right"} } onClick={ this.toggleFavorite }>
                  Favorite
                </span>
                <span style={{fontStyle: "italic", fontSize: '.8em'}}>
                  <span style={{fontWeight: 'bold', color: 'blue', fontSize: '1.1em'}}> { this.state.commentsView ? 'hide ' : 'show ' } </span>
                    { commentNumber + ' comments'}
                </span>
              </div>
              <div style={ this.state.commentsView ? this.styles.commentsView : this.styles.hidden }>
                <CommentBox messageId={ this.props.messageId } token={ this.props.token } auth={ this.props.auth }/>
                { commentRowsSortedOptions['recent'] }
              </div>
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
      fontSize: "19px"
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
    commentsView: {
      display: "block",
    },
    hidden: {
      display: "none",
    },
    arrows: {
    }
  }
});

module.exports = Message;
