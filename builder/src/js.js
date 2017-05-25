'use strict';

var gulp       = require('gulp');
var del        = require('del').sync;
var babel      = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var concat     = require('gulp-concat');
var error      = require('../pipes/error');
var $config    = require('./lib/config');

module.exports = {
  task,
  watch
};

var src      = [
  "src/**/*.js",
  "!src/**/*.mock.js"
];
var srcMocks = [
  "src/**/*.js"
];
var srcWatch = [
  "src/**/*.js"
];
var dist     = "dist";
var clean    = [
  "dist/**/*.js",
  "!dist/config.js"
];

var babelOptions = {
  presets: ['es2015']
};

function task() {
  del(clean);
  var isDev = $config.env == 'dev';

  var tasker = new Pipe(($config.mocks ? srcMocks : src), 'Failed to load JS sources');
  tasker.next(sourcemaps.init(), 'Failed to init JS sourcemap')
  if (!isDev) {
    tasker.next(babel(babelOptions), 'Babel build failed')
  }
  tasker.next(concat('all.js'), 'Failed to concat JS')
  tasker.next(sourcemaps.write('.'), 'Failed to make JS sourcemap')
  return tasker.dest(dist);
}

function watch() {
  gulp.watch(srcWatch, ['js']);
}

Pipe.prototype.next = pipeNext;
Pipe.prototype.dest = pipeDest;

function Pipe(src, beginErrorText) {
  this.task = gulp.src(src);
  this.task = this.task.on('error', error(beginErrorText));
}

function pipeNext(pipe, errorText) {
  this.task = this.task.pipe(pipe);
  this.task = this.task.on('error', error(errorText));
  return this.task;
}

function pipeDest(dist) {
  this.task = this.task.pipe(gulp.dest(dist));
  return this.task;
}