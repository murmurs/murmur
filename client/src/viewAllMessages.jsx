var React = require('react');
var Message = require('./message');
var url = 'http://0.0.0.0:3000/';


var ViewAllMessages = React.createClass({

  getInitialState: function() {
    return {
      messages:'' //the messages are initially empty, set later by the call to the messages json file.
    }
  },

  // componentDidMount: function() {
  //   console.log("easy");
  //   console.log("in messages");
  //   $.ajax({
  //     type: 'GET',
  //     url: url + 'message',
  //     contentType: 'application/json',
  //     success: function(messages){
  //       var messages = JSON.parse(messages);
  //       console.log(messages);
  //       var messageRows = [];
  //       console.log("mrow1", messageRows);
  //       for(var i=0; i<messages.length; i++) {
  //         var message = messages[i];
  //         console.log(messages[i]);
  //         //this is utilizing the message component and setting message properties for use in the message view.
  //         // baseId={ message.baseId}
  //         // hairId={ message.hairId}
  //         messageRows.push(
  //           <Message
  //             message={ message.message } 
  //             comments={ message.comments } />
  //         );
  //       }
  //       console.log(messageRows);
  //       // this.setState({messages: "easy"});
  //       this.setState({messages:messageRows});
  //     }.bind(this)
  //   });
  // },
  
  getMessages: function(){
    console.log("in messages");
    $.ajax({
      type: 'GET',
      url: url + 'message',
      contentType: 'application/json',
      success: function(messages){
        var messages = JSON.parse(messages);
        console.log(messages);
        var messageRows = [];
        console.log("mrow1", messageRows);
        for(var i=0; i<messages.length; i++) {
          var message = messages[i];
          console.log(messages[i]);
          //this is utilizing the message component and setting message properties for use in the message view.
          // baseId={ message.baseId}
          // hairId={ message.hairId}
          messageRows.push(
            <Message
              message={ message.message } 
              comments={ message.comments }
              votes={ message.votes }
              comments={ message.comments } />
          );
        }
        console.log(messageRows);
        // this.setState({messages: "easy"});
        this.setState({messages:messageRows});
      }.bind(this)
    });
  },


  render: function() {

    console.log("RENDERING");
    this.getMessages(); //fetch the messages from the db. They get set to messages state to be displayed.

    // Push messages from Firebase to messageRows
    

    // Sort Messages by time or popularity (ie number of votes)
    var messageRowsSortedOptions = {
    //   recent: messageRows.slice().sort(function(a,b){
    //     return b.props.timestamp - a.props.timestamp;
    //   }),
    //   popular: messageRows.slice().sort(function(a,b){
    //     return b.props.votes - a.props.votes;
    //   })

    //   myPosts: messageRows.filter(function(message){
    //     if(this.props.sessions[this.props.auth.uid] && this.props.sessions[this.props.auth.uid].posted){
    //       return this.props.sessions[this.props.auth.uid].posted.hasOwnProperty(message.props.messageId);
    //     }
    //     return false;
    //   }.bind(this))
    // };
    //   //favorites will be much easier once we have usernames.
    //   // favorites: messageRows.filter(function(message){
    //   //   if(this.props.sessions[this.props.auth.uid] && this.props.sessions[this.props.auth.uid].favorites){
    //   //     return this.props.sessions[this.props.auth.uid].favorites.hasOwnProperty(message.props.messageId);
    //   //   }
    //   //   return false;
    //   // }.bind(this)).sort(function(a,b){ // not sorting correctly - FIX
    //   //   return b.props.timestamp - a.props.timestamp;
    //   // })

    //   // myPosts will be much easier once we have user names.
    //   // myPosts: messageRows.filter(function(message){
    //   //   if(this.props.sessions[this.props.auth.uid] && this.props.sessions[this.props.auth.uid].posted){
    //   //     return this.props.sessions[this.props.auth.uid].posted.hasOwnProperty(message.props.messageId);
    //   //   }
    //   //   return false;
    //   // }.bind(this)),
     };

    return (
      <div style={ this.styles.messageRows }>        
        {this.state.messages}
      </div>
    );
  },

  styles: {
    messageRows: {
      padding: '10px',
      width: '50%',
      height: '100px',
      float: 'left'
    }
  }
});

module.exports = ViewAllMessages;
