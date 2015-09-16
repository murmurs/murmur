var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var server = require('gulp-server-livereload');

gulp.task('default', function() {
  var bundler = watchify(browserify({
    entries: ['./client/src/app.jsx'],
    transform: [reactify],
    extensions: ['.jsx'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }));

  function build(file) {
    if (file) gutil.log('Recompiling ' + file);
    return bundler
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('main.js'))
      .pipe(gulp.dest('./client/'));
  };
  build();
  bundler.on('update', build);

  gulp.src('./client')
    .pipe(server({
      port: 8080,
      livereload: {
        enable: true,
        filter: function(filePath, cb) {
          cb( /main.js/.test(filePath) );
        }
      },
    }));
});

gulp.task('test', function(){

  var b = browserify({
    entries:['./client/src/inputbox.jsx'],
    transform: [reactify],
    extensions: ['.jsx'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  function build(){
    return b
    .bundle()
    .pipe(source('./__tests__/inputbox.js'))
    .pipe(gulp.dest('./'))
  };
  
  build();

});


