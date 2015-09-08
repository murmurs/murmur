var React = require('react');
var TopBar = require('./topbar');
var PostMessage = require('./postmessage');
var NewOrHot = require('./neworhot');
var Message = require('./message');

require("./viewAllMessage.css");

var ViewAllMessage = React.createClass({
  render: function() {
    var messagesObject = this.props;
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
    return (
      <div>
        <TopBar/>
        <div>
          <div style={this.styles.newOrHot}>
            <NewOrHot/>
            <PostMessage/>
          </div>
          <div style={this.styles.messageRows}>
            { messageRows }
          </div>
        </div>
      </div>
    )
  },
  styles: {
    messageRows: {
      padding: '60px',
    },
    newOrHot: {
      paddingTop: '80px',
    },
  },
});

module.exports = ViewAllMessage;
