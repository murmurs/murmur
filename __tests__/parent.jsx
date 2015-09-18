var React = require('react');
var Inputbox = require('../client/src/inputbox.jsx');
// console.log(Inputbox);
var Parent = React.createClass({
  render:function(){
    return (
      <div>
        <Inputbox />
      </div>)
  }
})

module.exports = Parent;