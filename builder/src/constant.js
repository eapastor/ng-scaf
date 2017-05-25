'use strict';

var gulp       = require('gulp');
var del        = require('del').sync;
var ngConstant = require('gulp-ng-constant');
var error      = require('../pipes/error');

var $config = {};

module.exports = {
  setConfig,
  task,
  watch
};

var src      = [
  "src/scripts/config.json"
];
var srcWatch = [
  "src/scripts/config.json"
];
var dist     = "dist";
var clean    = ["dist/config.js"];

/**
 * @param {CmBuilderConfig} config
 */
function setConfig(config) {
  Object.assign($config, config);
}

function task() {
  del(clean);
  var options = {
    name     : 'tas.lib.config',
    deps     : [],
    constants: {cmConfig: $config.ng},
    wrap     : false
  };

  return gulp
    .src(src)
    .on('error', error('Failed to load Constant sources'))
    .pipe(ngConstant(options))
    .on('error', error('Failed to made Angular Constant'))
    .pipe(gulp.dest(dist));
}

function watch() {
  gulp.watch(srcWatch, ['ng-const']);
}