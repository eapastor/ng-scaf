'use strict';

var gulp = require('gulp');
var del  = require('del').sync;

var src      = [];
var distTask = "dist/fonts";
var clean    = ["dist/fonts/**"];
var distProd = "prod/fonts";

module.exports = {
  setConfig,
  task,
  prod
};

/**
 * @param {CmBuilderConfig} config
 */
function setConfig(config) {
  src = config.fonts || src;
}

function task() {
  del(clean);
  return gulp
    .src(src)
    .pipe(gulp.dest(distTask));
}

function prod() {
  return gulp
    .src(src)
    .pipe(gulp.dest(distProd));
}