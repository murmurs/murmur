var React = require('react');

TopBar = React.createClass({
  render: function() {
    return (
      <div className="navbar navbar-default navbar-fixed-top" style={{'backgroundColor': 'rgb(5,101,188)'}}>
        <div className="container">
          <div className="navbar-header" style={{'float': 'left', 'padding': '15px', 'textAlign': 'center', 'width': '100%' }}>
            <a href="" className="navbar-brand" style={{'fontFamily': 'Sarina', 'color': 'white', 'float': 'none' }}> Murmur</a>
          </div>
        </div>
      </div>
    )
  }
});



module.exports = TopBar;
