'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

var $config = require('./src/lib/config');
var ejs     = require('./src/ejs');
var fonts   = require('./src/fonts');
var files   = require('./src/files');
var html    = require('./src/html');
var images  = require('./src/images');
var js      = require('./src/js');
var ngConst = require('./src/constant');
var less    = require('./src/less');
var prod    = require('./src/prod');
var deploy  = require('./src/deploy');

module.exports = {
  init
};

/**
 * @param {CmBuilderConfig} config
 */
function init(config) {
  fonts.setConfig(config);
  files.setConfig(config);
  ngConst.setConfig(config);
  ejs.setConfig(config);
  deploy.setConfig(config);
  prod.setConfig(config);

  $config.init({
    env  : config.flags.env || 'prod',
    mocks: config.flags.mocks,
    gMaps: config.flags.gMaps,
  });

  gulp.task('default', function () {
    console.log('Hello!');
  });

  gulp.task('ejs', ejs.task);
  gulp.task('ejs-watch', ['ejs'], ejs.watch);

  gulp.task('fonts', fonts.task);
  gulp.task('fonts-prod', fonts.prod);

  gulp.task('files', files.task);
  gulp.task('files-prod', files.prod);

  gulp.task('html', html.task);
  gulp.task('html-prod', html.prod);
  gulp.task('html-watch', ['html'], html.watch);

  gulp.task('images', images.task);
  gulp.task('images-prod', images.prod);
  gulp.task('images-watch', ['images'], images.watch);

  gulp.task('js', [], js.task);
  gulp.task('js-watch', ['js'], js.watch);

  gulp.task('ng-const', [], ngConst.task);
  gulp.task('ng-const-watch', ['ng-const'], ngConst.watch);

  gulp.task('less', less.task);
  gulp.task('less-watch', ['less'], less.watch);

  gulp.task('prod', prod.task);

  gulp.task('build', ['ejs', 'html', 'images', 'js', 'ng-const', 'less', 'fonts', 'files']);
  gulp.task('build-prod', buildProd);
  gulp.task('watch', ['ejs-watch', 'html-watch', 'images-watch', 'js-watch', 'ng-const-watch', 'less-watch', 'fonts', 'files']);
  gulp.task('deploy-init', deploy.init);
  gulp.task('deploy-push', deploy.push);
  gulp.task('deploy', deployProd);
}


function buildProd(callback) {
  return runSequence(
    'build',
    'prod',
    ['html-prod', 'images-prod', 'fonts-prod', 'files-prod'],
    callback);
}

function deployProd(callback) {
  return runSequence(
    'deploy-init',
    'build-prod',
    'deploy-push',
    callback);
}

/**
 * @typedef {Object} CmBuilderConfig
 * @typedef {String} CmBuilderConfig.fonts
 * @typedef {String} CmBuilderConfig.repo
 * @typedef {String} CmBuilderConfig.package
 */