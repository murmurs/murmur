var React = require('react');
var Message = require('./message');

require("./viewAllMessage.css");

var ViewAllMessages = React.createClass({
  render: function() {
    var messagesObject = this.props.messages;
    var messageRows = [];
    for(key in messagesObject){
      var message = messagesObject[key];
      messageRows.push(
        <Message
          messageId={ message.messageId }
          message={ message.message }
          comments={ message.comments }
          votes={ message.votes }
          timestamp={ message.timestamp }/>
      )
    }
    var messageRowsSortedOptions = {
      recent: messageRows.slice().sort(function(a,b){
        return b.props.timestamp - a.props.timestamp;
      }),
      popular: messageRows.slice().sort(function(a,b){
        return b.props.votes - a.props.votes;
      }),
    }
    return (
      <div style={this.styles.messageRows}>
        { messageRowsSortedOptions[this.props.sortBy] }
      </div>
    )
  },
  styles: {
    messageRows: {
      padding: '10px',
    },
  },
});

module.exports = ViewAllMessages;
