npm install
npm run serve

-->

'main.js' is a combination of all jsx files in the 'src' folder PLUS all dependencies we installed using npm. (note: it's a huge file!!)

# Create 'src' folder (this is where all jsx files go to)
Create app.jsx - this is where element instance will be created and rendered using options
For example,
  <!--
  var React = require('react');
  var ThumbnailList = require('./thumbnail-list');

  var options = {
    thumbnailData:  [{
      title: 'Show Courses',
      imageUrl: 'https://raw.githubusercontent.com/wiki/facebook/react/react-logo-1000-transparent.png'
    },{
      title: 'Show Courses',
      imageUrl: 'http://brunch.io/images/others/gulp.png'
    }]
  };

  var element = React.createElement(ThumbnailList, options);
  React.render(element, document.querySelector('.container'));
  -->

How to create other jsx files:
1. "var React = require('react');" should be the first line in all jsx files
2. Specify all component dependencies
3. Create a class using React and save it to module.exports:
<!--
module.exports = React.createClass({
  render: function() {
    return <div></div>
  }
});
-->
