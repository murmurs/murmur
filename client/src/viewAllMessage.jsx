var React = require('react');
var TopBar = require('./topbar');
var PostMessage = require('./postmessage');
var NewOrHot = require('./neworhot');
var Message = require('./message');

require("./viewAllMessage.css");

var ViewAllMessage = React.createClass({
  render: function() {
    return (
      <div>
        <TopBar/>
        <div className="ViewAllMessage__content" style={{paddingTop: "80px"}}>
          <div>
            <NewOrHot/>
            <PostMessage/>
          </div>
          <Message/>
          <Message/>
        </div>
      </div>
    )
  }
});

module.exports = ViewAllMessage;
