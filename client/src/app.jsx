var React = require('react');
var ViewAllMessages = require('./viewAllMessages');
var TopBar = require('./topbar');
var InputBox = require('./inputbox');
var Firebase = require('firebase');

var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbiI6ZmFsc2UsInYiOjAsImQiOnsidWlkIjoiNDUxYmI1NDMtNTZhNy01OGQxLWI2NWEtMjZkZDM3OTU2ZDRiIiwibGlrZWRNZXNzYWdlc0lkIjpbXSwicG9zdGVkTWVzc2FnZXNJZCI6W10sImJhc2VJZCI6OSwiaGFpcklkIjo1Nn0sImlhdCI6MTQ0MjA0NDM2N30.L31Xy07IDKuUlGNwtIM19PY1Y3WX9cuORZFXntFV4fA'

var mainView = React.createClass({

  messages: [],
  getInitialState: function(){
    return {
      messages: [],
      sort: 'recent',
      token: '',
      decodedToken: '',
    };
  },

  // Retrieve the messages data from Firebase
  componentWillMount: function(){
    var context = this;
    this.firebaseRef = new Firebase('https://fiery-heat-3376.firebaseio.com/Fresh%20Post');
    this.firebaseRef.authWithCustomToken(token, function(error, authData){
      context.setState({
        token: authData.token,
        auth: authData.auth,
      });
    })
    this.firebaseRef.on('value', function(dataSnapshot){
      this.messages.push(dataSnapshot.val());
      this.setState({
        messages: dataSnapshot.val()
      });
    }.bind(this));
  },

  handleSortRecent: function(){
    this.setState({sort: 'recent'});
  },
  handleSortPopular: function(){
    this.setState({sort: 'popular'});
  },
  toggleInputBox: function(){
    this.setState({ input: !this.state.input })
  },
  render: function(){
    return (
      <div>
        <TopBar/>
        <div>
          <div style={this.styles.filter}>
            <div className="btn-group" style={{ position: "relative", left: "38%"}}>
              <button className="btn btn-default" onClick={ this.handleSortRecent }> New </button>
              <button className="btn btn-default" onClick={ this.handleSortPopular }> Hot </button>
              <button className="btn btn-default">Favorites</button>
              <button className="btn btn-default">My Posts</button>
            </div>
            <InputBox token={ this.state.token }/>
            { this.state.decodedToken.hairId }
          </div>
          <ViewAllMessages sortBy={ this.state.sort } messages={ this.state.messages } token={ this.state.token } auth= { this.state.auth }/>
        </div>
      </div>
    )
  },
  styles: {
    filter: {
      paddingTop: '80px'
    },
    inputBox: {
      marginTop: '200px'
    }
  }
})


var element = React.createElement(mainView);
React.render(element, document.querySelector('.container'));
