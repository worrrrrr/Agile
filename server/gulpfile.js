var gulp = require('gulp');
var browserSync = require('browser-sync')
var nodemon = require('gulp-nodemon');
var exec = require('child_process').exec;



gulp.task('default', ['browser-sync'], function () {
});

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3000",
        files: ["www/**/*.*"],
        browser: "google chrome",

  });
});
gulp.task('nodemon', function (cb) {
  var started = false;
  return nodemon({
    script: 'index.js'
  }).on('start', function () {
    if (!started) {
      cb();
      started = true; 
    } 
  });
});

