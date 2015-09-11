var React = require('react');
var Message = require('./message');

var ViewAllMessages = React.createClass({
  render: function() {
    var messagesObject = this.props.messages; // from Firebase

    // Push messages from Firebase to messageRows
    var messageRows = [];

    for(messageKey in messagesObject){
      var commentRows = [];
      var message = messagesObject[messageKey];

      messageRows.push(
        <Message
          messageId={ message.messageId }
          key={ message.messageId }
          message={ message.message }
          comments={ message.comments }
          votes={ message.votes }
          messageId={ message.messageId }
          timestamp={ message.timestamp }/>
      )
    }

    // Sort Messages by time or popularity (ie number of votes)
    var messageRowsSortedOptions = {
      recent: messageRows.slice().sort(function(a,b){
        return b.props.timestamp - a.props.timestamp;
      }),
      popular: messageRows.slice().sort(function(a,b){
        return b.props.votes - a.props.votes;
      }),
    }
    return (
      <div style={ this.styles.messageRows }>
        { messageRowsSortedOptions[this.props.sortBy] }
      </div>
    )
  },

  styles: {
    messageRows: {
      padding: '10px',
    },
  }
});

module.exports = ViewAllMessages;
