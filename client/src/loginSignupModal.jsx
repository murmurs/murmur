var React = require('react');
var url = 'http://0.0.0.0:3000/';

var LoginSignupModal = React.createClass({
  // getInitialState: function() {
  //   return {
  //     message: ''
  //   };
  // },
  // // Update message value whenever user changes the message in the input box
  // handleChange: function(event){
  //   if(event.target.value.length <= 150) { // Message cannot be longer than 150 characters
  //     if (event.target.value.keyCode == 13) { // "Enter"
  //       this.handleClick;
  //     }

  //     this.setState({
  //       'message': event.target.value
  //     });
  //   }
  // },

  // enterPressed: function(event) {
  //   if(event.keyCode === 13) {
  //     event.preventDefault();
  //     $.ajax({ // Post message
  //       type: 'POST',
  //       url: url,
  //       contentType: 'application/json',
  //       data: JSON.stringify({ "message": this.state.message }),
  //       success: function(d){
  //         console.log('POST successful: ', d);
  //       }
  //     });
  //     this.setState({message: ''}); // Clear input box
  //     console.log(this.state);
  //   }
  // },

  // // Post a message when "Submit" button is clicked
  // handleClick: function(event){
  //   event.preventDefault();
  //   $.ajax({ // Post message
  //     type: 'POST',
  //     url: url,
  //     contentType: 'application/json',
  //     // headers: {'Cookie' : document.cookie },
  //     data: JSON.stringify({
  //       "uid": this.props.auth.uid,
  //       "message": this.state.message,
  //       "token": this.props.token
  //     }
  //     ),
  //     success: function(d){
  //       console.log('POST successful: ', d);
  //     }
  //   });
  //   this.setState({message: ''}); // Clear input box
  //   console.log(this.state);
  // },
  // two-way binding inputbox's value and this.state.message

  getInitialState: function() {
    return {
      usernameSignup: '',
      passwordSignup: ''
    };
  },



  newSignup: function(event){
    event.preventDefault();
    console.log("button clicked!", this.state.username, this.state.password);

    $.ajax({
      type: 'POST',
      url: url +'signup',
      contentType: 'application/json',
      data: JSON.stringify({
        "username": this.state.username,
        "password": this.state.password
      }),
      success: function(data) {
        console.log('Post Successful', data);
      }
    })
  },

  handleUsername: function(event){
    this.setState({
      'username': event.target.value
    });
  },

  handlePassword: function(event){
    this.setState({
      'password': event.target.value
    });
  },

  render: function() {
    return (
      <div id="myModal" className="modal fade" role="dialog">
        <div className="modal-dialog">

          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">User Login</h4>
            </div>
            <div className="modal-body">
              <form>
                <input placeholder="Username" type="text" />
                <input placeholder="Password" type="text" />
                <button>Login!</button>
              </form>
            </div>
            <div className="modal-header">
              <h4 className="modal-title">Need Account? Sign up!</h4>
            </div>
            <div className="modal-body">
              <form>
                <input placeholder="Username" type="text" onChange={this.handleUsername}></input>
                <input placeholder="Password" type="text" onChange={this.handlePassword}></input>
                <button onClick={this.newSignup}>Signup!</button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LoginSignupModal;


