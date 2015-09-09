var React = require('react');
var moment = require('moment');

var url = 'http://localhost:8080/';

module.exports = React.createClass({
  upVote: function(event){
    var messageId = $(event.target).parent().attr('id');
    $.ajax({
      type: 'POST',
      url: url + 'Vote' ,
      contentType: 'application/json',
      data: JSON.stringify({"messageId": messageId, "vote": true}),
      success: function(){
      }
    })
  },
  downVote: function(event){

    var messageId = $(event.target).parent().attr('id');
    $.ajax({
      type: 'POST',
      url: url + 'Vote' ,
      contentType: 'application/json',
      data: JSON.stringify({"messageId": messageId, "vote": false}),
      success: function(){
      }
    })

  },
  render: function() {
    return (
      <div className="jumbotron" id={ this.props.messageId }>
        <div style={ this.styles.messageBox }>
          { this.props.message }
        </div>
        <div style={ this.styles.timestamp }>
          { moment(this.props.timestamp).fromNow() }
        </div>
        <div style={ this.styles.votes }>
          { this.props.votes }
        </div>
        <img src="./src/img/glyphicons-151-edit.png" alt="Post a Message" style={{float: "right", position: "relative", top: "4px"}}/>
        <img src="./src/img/glyphicons-601-chevron-up.png" alt="Up Vote" onClick={ this.upVote }/>
        <img src="./src/img/glyphicons-602-chevron-down.png" alt="Down Vote" onClick={ this.downVote }/>
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
