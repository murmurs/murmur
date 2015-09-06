var React = require('react');
var url;

module.exports = React.createClass({
  getInitialState: function() {
    return {
      message: ''
    };
  },
  handleChange: function(event){
    if(event.target.value.length <= 150) {
      this.setState({
        'message': event.target.value
      });
    }
  },
  handleClick: function(event){
    event.preventDefault();
    // $.post(url, {message: this.state.message});
    this.setState({message: ''});
    console.log(this.state)
  },
  render: function() {
    return (
        <form>
          <input type="text" onChange={this.handleChange} value={this.state.message}/>
          <button onClick={this.handleClick}>submit message</button>
        </form>
    )
  }
});
