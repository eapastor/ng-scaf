'use strict';

var gulp     = require('gulp');
var del      = require('del').sync;
var ejs      = require('gulp-ejs');
var notifier = require('node-notifier');

var $config  = {};
var $package = {};

var srcTask  = ["src/index.ejs"];
var srcWatch = ["src/**/*.ejs"];
var dist     = "dist";
var clean    = ["dist/index.ejs"];
var options  = {ext: '.html'};

module.exports = {
  setConfig,
  task,
  watch
};

/**
 * @param {CmBuilderConfig} config
 */
function setConfig(config) {
  $config  = config.flags;
  $package = config.package || $package;
}

function task() {
  del(clean);

  var data = {
    $config,
    $package
  };

  return gulp
    .src(srcTask)
    .pipe(ejs(data, options))
    .on('error', error)
    .pipe(gulp.dest(dist));
}

function watch() {
  gulp.watch(srcWatch, ['ejs']);
}

function error(e) {
  var msg = e.message;
  console.error(msg);
  notifier.notify({
    title  : 'EJS Error',
    message: msg,
    sound  : true
  });
  this.emit('end');
}