var React = require('react');
var url = 'http://0.0.0.0:3000/';

var InputBox = React.createClass({
  getInitialState: function() {
    return {
      message: ''
    };
  },
  // Update message value whenever user changes the message in the input box
  handleChange: function(event){
    if(event.target.value.length <= 150) { // Message cannot be longer than 150 characters
      if (event.target.value.keyCode == 13) { // "Enter"
        this.handleClick;
      }

      this.setState({
        'message': event.target.value
      });
    }
  },

  enterPressed: function(event) {
    if(event.keyCode === 13) {
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
    }
  },

  // Post a message when "Submit" button is clicked
  handleClick: function(event){
    event.preventDefault();
    $.ajax({ // Post message
      type: 'POST',
      url: url,
      contentType: 'application/json',
      // headers: {'Cookie' : document.cookie },
      data: JSON.stringify({
        "uid": this.props.auth.uid,
        "message": this.state.message,
        "token": this.props.token
      }
      ),
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
      <div className="input-group" style = {{padding: '15px'}}>
        <input value={this.state.message} onChange={this.handleChange} onKeyDown={this.enterPressed} type="text" className="form-control"  placeholder="What's on your mind?" />
        <span className="input-group-btn">
          <button onClick={this.handleClick} className="btn btn-success" type="button"> Submit </button>
        </span>
      </div>
    )
  }
});

module.exports = InputBox;
