'use strict';

var gulp = require('gulp');
var del  = require('del').sync;

var src      = [];
var distTask = "dist/files";
var clean    = ["dist/files/**"];
var distProd = "prod/files";

module.exports = {
  setConfig,
  task,
  prod
};

/**
 * @param {CmBuilderConfig} config
 */
function setConfig(config) {
  src = config.files || src;
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