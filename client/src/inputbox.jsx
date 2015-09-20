var React = require('react/addons');
var url = 'http://0.0.0.0:3000/';


var InputBox = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {message: ''};
  },
  handleSubmit: function(event) {
    event.preventDefault(); //prevent the form from actually submitting.

    $.ajax({
      type: 'POST',
      url: url + "message",
      contentType: 'application/json',
      data: JSON.stringify({
        //maybe the userId and username are set on the server side..
        "userId": "SDFSDFSDFSDF34234", //this needs to be set by the session.
        "username": window.sessionStorage.username, //this needs to be set by the session.
        "message": this.state.message,
        "latitude": localStorage.latitude,
        "longitude": localStorage.longitude
      }),
      success: function(d){
        console.log('POST successful: ', d);
      }
    });
  },

  render: function() {
    return (
      <div className="input-group" style = {{padding: '10px', width: "45%", position: 'relative'}}>
        <form onSubmit={this.handleSubmit} style={{}} className="clearfix">
          <input type="text" valueLink={this.linkState('message')} className="form-control" placeholder="What's on your mind?" style={{"width":"95%", "float":"left"}}/>
          <span className="input-group-btn" style={{"float":"left", "width":"5%"}}>
            <input type="submit" className="btn btn-success"> Submit </input>
          </span>
        </form>
      </div>
    )
  }
});

module.exports = InputBox;

