var React = require('react');
var ViewAllMessages = require('./viewAllMessages');
var TopBar = require('./topbar');
var InputBox = require('./inputbox');
var Firebase = require('firebase');
var Map = require('./map');


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
      messages: '',
      sort: 'recent',
      token: '',
      auth: '',
      sessions: '',
    };
  },

  // Retrieve the messages data from Firebase
  componentWillMount: function(){
    if(token){
      var context = this;
      this.firebaseRef = new Firebase('https://resplendent-inferno-6476.firebaseio.com/');
      this.firebaseRef.authWithCustomToken(token, function(error, authData){
        if(error){
          console.log('Problem connecting to Database', error)
        } else{
          console.log('Connected to Databse')
          context.setState({
            token: authData.token,
            auth: authData.auth,
          });
        }
      })
      this.messageRef = this.firebaseRef.child('Fresh Post');
      this.messageRef.on('value', function(dataSnapshot){
        this.messages.push(dataSnapshot.val());
        this.setState({
          messages: dataSnapshot.val()
        });
        console.log('inFreshPost', dataSnapshot.val())
      }.bind(this));

      this.sessionsRef = this.firebaseRef.child('sessions');
      this.sessionsRef.on('value', function(dataSnapshot){
        this.messages.push(dataSnapshot.val());
        this.setState({
          sessions: dataSnapshot.val()
        });
      // console.log('SESSSSSSSSSSSSSSSSionREF', this.sessionRef.toString())
        console.log('inSession', dataSnapshot.val())
      }.bind(this));
    }
  },

  handleSortRecent: function(){
    this.setState({sort: 'recent'});
  },
  handleSortPopular: function(){
    this.setState({sort: 'popular'});
  },
  handleFavorites: function(){
    this.setState({sort: 'favorites'});
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
            <Map />
            <div className="btn-group" style={{display: 'inline-block'}}>
              <button className="btn btn-default" style={{fontFamily: 'Roboto'}} onClick={ this.handleSortRecent }> New </button>
              <button className="btn btn-default" style={{fontFamily: 'Roboto'}} onClick={ this.handleSortPopular }> Hot </button>
              <button className="btn btn-default" style={{fontFamily: 'Roboto'}} onClick={ this.handleFavorites }>Favorites</button>
              <button className="btn btn-default" style={{fontFamily: 'Roboto'}} onClick={ this.handleMyPosts }>My Posts</button>
            </div>
            <InputBox token={ this.state.token } auth={ this.state.auth }/>
          </div>
          <ViewAllMessages sortBy={ this.state.sort } messages={ this.state.messages } sessions={ this.state.sessions }token={ this.state.token } auth={ this.state.auth }/>
        </div>
      </div>
    )
  },
  styles: {
    filter: {
      paddingTop: '80px',
      width: '100%',
      textAlign: 'center'
    },
    inputBox: {
      marginTop: '200px'
    }
  }
})


var element = React.createElement(mainView);
React.render(element, document.querySelector('.container'));
