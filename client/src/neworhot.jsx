var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="btn-group" style={{float: "left", position: "relative", left: "40%"}}>
        <button className="btn btn-default">New</button>
        <button className="btn btn-default">Hot</button>
      </div>
    )
  }
});
