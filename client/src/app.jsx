var React = require('react');
var ViewAllMessage = require('./viewAllMessage');


var ViewAllFreshMessages = React.createClass({

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
      <ViewAllMessage messages={ this.state.messages }/>
    )
  },
})


var element = React.createElement(ViewAllFreshMessages);
React.render(element, document.querySelector('.container'));
