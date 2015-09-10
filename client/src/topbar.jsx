var React = require('react');

TopBar = React.createClass({
  render: function() {
    return (
      <div className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a href="" className="navbar-brand"> Murmur</a>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = TopBar;
