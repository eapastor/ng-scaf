'use strict';

var gulp = require('gulp');
var del  = require('del').sync;

module.exports = {
  task,
  prod,
  watch
};

var src      = [
  "src/**/*.png",
  "src/**/*.jpg",
  "src/**/*.svg"
];
var dist     = "dist";
var distProd = "prod";
var clean    = [
  "dist/**/*.png",
  "dist/**/*.jpg",
  "dist/**/*.svg"
];

function task() {
  del(clean);
  return gulp
    .src(src)
    .pipe(gulp.dest(dist));
}

function prod() {
  return gulp
    .src(src)
    .pipe(gulp.dest(distProd));
}

function watch() {
  gulp.watch(src, ['images']);
}