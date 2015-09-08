var React = require('react');
var ViewAllMessages = require('./viewAllMessages');
var TopBar = require('./topbar');
var NewOrHot = require('./neworhot');
var PostMessage = require('./postmessage');


var mainView = React.createClass({

  messages: [],
  getInitialState: function(){
    return {
      messages: []
    }
  },
  componentWillMount: function(){
    this.firebaseRef = new Firebase('https://fiery-heat-3376.firebaseio.com/Fresh%20Post')
    this.firebaseRef.on('value', function(dataSnapshot){
      this.messages.push(dataSnapshot.val());
      this.setState({
        messages: dataSnapshot.val()
      });
    }.bind(this));
  },
  render: function(){
    return (
      <div>
        <TopBar/>
        <div>
          <div style={this.styles.sortSelectors}>
            <NewOrHot/>
            <PostMessage/>
          </div>
          <ViewAllMessages messages={ this.state.messages }/>
        </div>
      </div>

    )
  },
  styles: {
    sortSelectors: {
      paddingTop: '80px',
    },
  }
})


var element = React.createElement(mainView);
React.render(element, document.querySelector('.container'));
