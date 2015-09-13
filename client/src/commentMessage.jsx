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
      <div id={ this.props.commentId } key={ this.props.commentId }>
        <div className="conatiner" style={{float: 'left', clear: 'both', marginBottom: '5px'}}>
          <div style={ this.styles.commentContainer }>
            <span style={{float: "left"}}>
              <Face base={ 11 } hair={ 29 } key={ this.props.commentId }/>
            </span>
            <span style={{float: "left"}}>
              <p style={{fontFamily: 'Roboto', color: 'black', fontSize: '1em'}}>
                { this.props.commentMessage }
              </p>
              <span style={{fontStyle: "italic", fontSize: '.8em', float: "left"}}>
                ({ moment(this.props.commentTimestamp).fromNow() })
              </span>
            </span>
          </div>
        </div>
        <div style={ this.styles.voteContainer }>
          <img src="./src/img/glyphicons-601-chevron-up.png" style={ this.styles.arrows } alt="Up Vote" onClick={ this.upVote }/>
            <span className="count"  style={ this.styles.voteCount }> { this.props.commentVotes } </span>
          <img src="./src/img/glyphicons-602-chevron-down.png" style={ this.styles.arrows } alt="Down Vote" onClick={ this.downVote }/>
        </div>
      </div>
    )
  },
  styles: {
    timestamp: {
      float: "left",
      marginLeft: '10px',
      position: 'relative',
      top: '1.5px'
    },
    votes: {
      float: "right",
      fontSize: "19px"
    },
    writeButton: {
      float: "left",
      position: "relative",
      top: "4px"
    },
    arrows: {
      float: "right"
    },
    iconStyle: {
      marginLeft: "10px",
      marginRight: "10px",
    },
    voteContainer: {
      width: "20px",
      float: "right"
    },
    voteCount: {
      margin: 'auto',
      fontSize: '1.3em'
    }
  }
});
