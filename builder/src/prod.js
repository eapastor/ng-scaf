'use strict';

var gulp     = require('gulp');
var del      = require('del').sync;
var ejs      = require('gulp-ejs');
var notifier = require('node-notifier');
var useref   = require('gulp-useref');

var $config  = require('./lib/config');
var $package = {};

var src   = ["dist/index.html"];
var dist  = "prod";
var clean = [
  "prod/fonts",
  "prod/files",
  "prod/scripts",
  "prod/styles",
  "prod/index.html"
];

var data          = {
  $config,
  $package
};
var options       = {ext: '.html'};
var userefOptions = {
  transformPath: path => (path.replace(/[\\\/]{1}dist[\\\/]{1,2}bower_components/, '/bower_components'))
};

module.exports = {
  setConfig,
  task
};

/**
 * @param {CmBuilderConfig} config
 */
function setConfig(config) {
  $package = config.package || $package;
}

function task() {
  del(clean);
  return gulp
    .src(src)
    .pipe(ejs(data, options))
    .on('error', error)
    .pipe(useref(userefOptions))
    .on('error', error)
    .pipe(gulp.dest(dist));
}

function error(e) {
  var msg = e.message;
  console.error(msg);
  notifier.notify({
    title  : 'Build Error',
    message: msg,
    sound  : true
  });
  this.emit('end');
}