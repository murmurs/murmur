var React = require('react');
var url = 'http://localhost:8080/comment';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      comment: ''
    };
  },
  handleChange: function(event){
    if(event.target.value.length <= 150) {
      this.setState({

        'comment': event.target.value,
      });
    }
  },
  handleClick: function(event){
    event.preventDefault();
    $.ajax({
      type: 'POST',
      url: url,
      contentType: 'application/json',
      data: JSON.stringify({
        "comment": this.state.comment,
        'messageId': this.props.messageId,
      }),
      success: function(d){
        console.log('POST successful: ', d)
      }
    })
    this.setState({comment: ''});
    console.log(this.state)
  },
  render: function() {
    return (
        <form>
          <input type="text" onChange={this.handleChange} value={this.state.comment}/>
          <button onClick={this.handleClick}>submit comment</button>
        </form>
    )
  }
});
