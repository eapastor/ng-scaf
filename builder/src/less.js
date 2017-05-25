'use strict';

var gulp     = require('gulp');
var del      = require('del').sync;
var less     = require('gulp-less');
var concat   = require('gulp-concat');
var path     = require('path');
var notifier = require('node-notifier');

var src      = [
  "src/styles/**/*.less",
  "src/scripts/**/*.less"
];
var srcWatch = [
  "src/styles/**/*.less",
  "src/scripts/**/*.less"
];
var dist     = "dist/styles";
var clean    = ["dist/styles/**/*"];

var options = {
  paths: [path.join(__dirname, 'less', 'includes')]
};

module.exports = {
  task,
  watch
};

function task() {
  del(clean);
  return gulp
    .src(src)
    .pipe(concat('main.less'))
    .pipe(less(options))
    .on('error', error)
    .pipe(gulp.dest(dist));
}

function watch() {
  gulp.watch(srcWatch, ['less']);
}

function error(e) {
  var msg = e.message;
  console.error(msg);
  notifier.notify({
    title  : 'LESS Error',
    message: msg,
    sound  : true
  });
  this.emit('end');
}