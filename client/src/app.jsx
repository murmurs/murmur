var React = require('react');
var ViewAllMessages = require('./viewAllMessages');
var TopBar = require('./topbar');
var InputBox = require('./inputbox');
var Firebase = require('firebase');


var getCookies = function(){
  var pairs = document.cookie.split(";");
  var cookies = {};
  for (var i=0; i<pairs.length; i++){
    pairs
    var pair = pairs[i].trim().split("=");
    cookies[pair[0]] = unescape(pair[1]);
  }
  return cookies;
}

var cookies = getCookies();
var token = document.token = cookies.token;
var auth = document.auth = cookies.auth;

var mainView = React.createClass({

  messages: [],
  getInitialState: function(){
    return {
      messages: [],
      sort: 'recent',
      token: '',
      auth: '',
    };
  },

  // Retrieve the messages data from Firebase
  componentWillMount: function(){
    if(token){
      var context = this;
      this.firebaseRef = new Firebase('https://fiery-heat-3376.firebaseio.com/Fresh%20Post');
      this.firebaseRef.authWithCustomToken(token, function(error, authData){
        if(error){
          console.log('Problem connecting to Database')
        } else{
          console.log('Connected to Databse')
          context.setState({
            token: authData.token,
            auth: authData.auth,
          });
        }
      })
      this.firebaseRef.on('value', function(dataSnapshot){
        this.messages.push(dataSnapshot.val());
        this.setState({
          messages: dataSnapshot.val()
        });
      }.bind(this));
    }
  },

  handleSortRecent: function(){
    this.setState({sort: 'recent'});
  },
  handleSortPopular: function(){
    this.setState({sort: 'popular'});
  },
  handleMyPosts: function(){
    this.setState({sort: 'myPosts'});
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
              <button className="btn btn-default" onClick={ this.handleMyPosts }>My Posts</button>
            </div>
            <InputBox token={ this.state.token } auth={ this.state.auth }/>
          </div>
          <ViewAllMessages sortBy={ this.state.sort } messages={ this.state.messages } token={ this.state.token } auth={ this.state.auth }/>
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
