var React = require('react');
var url = 'http://localhost:8080/';

var InputBox = React.createClass({
  getInitialState: function() {
    return {
      message: ''
    };
  },
  // Update message value whenever user changes the message in the input box
  handleChange: function(event){
    if(event.target.value.length <= 150) { // Message cannot be longer than 150 characters
      this.setState({
        'message': event.target.value
      });
    }
  },
  // Post a message when "Submit" button is clicked
  handleClick: function(event){
    event.preventDefault();
    $.ajax({ // Post message
      type: 'POST',
      url: url,
      contentType: 'application/json',
      data: JSON.stringify({ "message": this.state.message }),
      success: function(d){
        console.log('POST successful: ', d);
      }
    });
    this.setState({message: ''}); // Clear input box
    console.log(this.state);
  },
  // two-way binding inputbox's value and this.state.message
  render: function() {
    return (
        <form>
          <input type="text" onChange={this.handleChange} value={this.state.message}/>
          <button onClick={this.handleClick}>Submit</button>
        </form>
    )
  }
});

module.exports = InputBox;
