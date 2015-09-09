var React = require('react');
var ViewAllMessages = require('./viewAllMessages');
var TopBar = require('./topbar');
var PostMessage = require('./postmessage');
var InputBox = require('./inputbox')


var mainView = React.createClass({

  messages: [],
  getInitialState: function(){
    return {
      messages: [],
      sort: 'recent',
      input: 'false',
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
          <div style={this.styles.sortSelectors}>
            { this.state.input ? <InputBox style={ this.styles.inputBox }/> : <div/>}
            <img src="./src/img/glyphicons-151-edit.png" alt="Post a Message" onClick={ this.toggleInputBox } style={{ position: "relative", top: "4px"}}/>
            <div className="btn-group" style={{ position: "relative", left: "40%"}}>
              <button className="btn btn-default" onClick={ this.handleSortRecent }>New</button>
              <button className="btn btn-default" onClick={ this.handleSortPopular }>Hot</button>
            </div>
          </div>
          <ViewAllMessages sortBy={ this.state.sort } messages={ this.state.messages }/>
        </div>
      </div>

    )
  },
  styles: {
    sortSelectors: {
      paddingTop: '80px',
    },
    inputBox: {
      marginTop: '200px'
    }
  }
})


var element = React.createElement(mainView);
React.render(element, document.querySelector('.container'));
