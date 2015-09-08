var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="jumbotron">
        <div style={ this.styles.messageBox }>
          { this.props.message }
        </div>
        <div style={ this.styles.timestamp }>
          { this.props.timestamp }
        </div>
        <div style={ this.styles.votes }>
          { this.props.votes }
        </div>
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
