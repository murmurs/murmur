var React = require('react');
var moment = require('moment');
var CommentBox = require('./commentBox');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      commentBox: 'false',
    }
  },
  toggleCommentBox: function(){
    alert('toggle')
    this.setState({ commentBox: !this.state.commentBox })
  },
  render: function() {
    return (
      <div className="jumbotron">
        <div style={ this.styles.messageBox }>
          { this.props.message }
        </div>
        <div style={ this.styles.timestamp }>
          { moment(this.props.timestamp).fromNow() }
        </div>
        <div style={ this.styles.votes }>
          { this.props.votes }
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
    },
    writeButton: {
      float: "left",
      position: "relative",
      top: "4px"
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
