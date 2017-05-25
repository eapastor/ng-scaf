'use strict';

var gulp = require('gulp');
var del  = require('del').sync;

var src      = ["src/**/*.html"];
var srcWatch = ["src/**/*.html"];
var dist     = "dist";
var distProd = "prod";
var clean    = ["dist/**/*.html", "!dist/index.html"];

module.exports = {
  task,
  prod,
  watch
};


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
  gulp.watch(srcWatch, ['html']);
}

function getDistMatcher(root) {
  return mathDist;

  function mathDist(file) {
    var relative = file.base.substr(file.cwd.length + 1)
                       .replace(/\\/g, '/');
    var parts    = relative.split('/');
    if (parts[1] == 'scripts') return `${root}/partial`;
    return `${root}/pages`;
  }
}