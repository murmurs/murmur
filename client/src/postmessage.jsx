var React = require('react');

// Just an icon...
var PostMessage = React.createClass({
  render: function() {
    return (
      <img src="./src/img/glyphicons-151-edit.png" alt="Post a Message" style={{float: "right", position: "relative", top: "4px"}}/>
    )
  }
});

module.exports = PostMessage;
