var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var server = require('gulp-server-livereload');
var replace = require('gulp-replace');
var sftp = require('gulp-sftp');

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
  
});

gulp.task('build', function() {
  var bundler = browserify({
    entries: ['./client/src/app.jsx'],
    transform: [reactify],
    extensions: ['.jsx'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  function build() {
    return bundler
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('main.js'))
      .pipe(replace('http://0.0.0.0:3000/', 'http://107.170.218.14/'))
      .pipe(gulp.dest('./client/'))
  };

  build();

});

gulp.task('send', function(){
  var clientPaths = [
    __dirname + '/client/main.js',
    __dirname + '/client/index.html',
  ];

  function send(paths, remotePath){
    return gulp.src(paths)
      .pipe(sftp({
        host:'107.170.218.14',
        user:'thefourloops',
        pass:'whph',
        remotePath: remotePath
      }))
      .on('error', function(error){
        console.log(error);
      });
  };
  send('package.json', '/home/thefourloops');
  send(clientPaths, '/home/thefourloops/client');
  send(__dirname + '/server/server.js', '/home/thefourloops/server');
});

gulp.task('deploy', ['build', 'send']);
