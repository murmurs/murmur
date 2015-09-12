var React = require('react');
var url = 'http://localhost:8080/comment';
var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbiI6ZmFsc2UsInYiOjAsImQiOnsidWlkIjoiNzcxZWEzMjAtZDA1Ni1mODExLWVmODctNzg1MTUwN2E3NWM2IiwibGlrZWRNZXNzYWdlc0lkIjpbXSwicG9zdGVkTWVzc2FnZXNJZCI6W10sImJhc2VJZCI6MTAsImhhaXJJZCI6MTB9LCJpYXQiOjE0NDIwMzQ4MDB9.bUNMIhtjxvB63K51WJGKbD_gEOWhE0czTWQx9at1Sr4'

var commentBox = React.createClass({
  getInitialState: function() {
    return {
      comment: ''
    };
  },
  // Update message value whenever user changes the message in the comment box
  handleChange: function(event){
    if(event.target.value.length <= 150) { // Message cannot be longer than 150 characters
      console.log(this.props.token)
      this.setState({
        'comment': event.target.value,
      });
    }
  },
  // Post a message when "Submit" button is clicked
  handleClick: function(event){
    event.preventDefault();
    $.ajax({
      type: 'POST',
      url: url,
      contentType: 'application/json',
      data: JSON.stringify({
        "comment": this.state.comment,
        'messageId': this.props.messageId,
        "token": this.props.token,
      }),
      success: function(d){
        console.log('POST successful: ', d);
      }
    });
    this.setState({comment: ''}); // Clear comment box
    console.log(this.props.auth);
  },
  // two-way binding commentBox's value and this.state.comment
  render: function() {
    return (
      <form>
        <input type="text" onChange={this.handleChange} value={this.state.comment}/>
        <button onClick={this.handleClick}>Submit</button>
      </form>
    )
  }
});

module.exports = commentBox;
