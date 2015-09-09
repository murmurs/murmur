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
          message={ message.message }
          comments={ message.comments }
          votes={ message.votes }
          timestamp={ message.timestamp }/>
      )
    }
    messageRows.sort(function(a,b){
      return b.props.timestamp - a.props.timestamp
    })
    return (
      <div style={this.styles.messageRows}>
        { messageRows }
      </div>
    )
  },
  styles: {
    messageRows: {
      padding: '60px',
    },
  },
});

module.exports = ViewAllMessages;
