#  Client Side Initial setup
<!-- install this so you can run gulp in terminal -->
npm install -g gulp-cli
<!-- create package.json -->
npm init
<!-- install all dependencies in client/-->
npm install --save gulp gulp-react gulp-concat browserify reactify vinyl-source-stream watchify gulp-util gulp-server-livereload node-notifier react-router jquery

# Create gulpfile.js
<!--
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var notifier = require('node-notifier');
var server = require('gulp-server-livereload');

var notify = function(error) {
  var message = 'In: ';
  var title = 'Error: ';

  if(error.description) {
    title += error.description;
  } else if (error.message) {
    title += error.message;
  }

  if(error.filename) {
    var file = error.filename.split('/');
    message += file[file.length-1];
  }

  if(error.lineNumber) {
    message += '\nOn Line: ' + error.lineNumber;
  }

  notifier.notify({title: title, message: message});
};

var bundler = watchify(browserify({
  entries: ['./src/app.jsx'],
  transform: [reactify],
  extensions: ['.jsx'],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true
}));

function bundle() {
  return bundler
    .bundle()
    .on('error', notify)
    .pipe(source('main.js'))
    .pipe(gulp.dest('./'));
}
bundler.on('update', bundle);

gulp.task('build', function() {
  bundle();
});

gulp.task('serve', function(done) {
  gulp.src('')
    .pipe(server({
      livereload: {
        enable: true,
        filter: function(filePath, cb) {
          cb( /main.js/.test(filePath) );
        }
      },
      open: true
    }));
});

gulp.task('default', ['build', 'serve']);

});
-->

# Create index.html
<!--
<html>
  <head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
  </head>
  <body>
    <div class="container">
    </div>
  </body>
  <script src="main.js"></script>
</html>
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
