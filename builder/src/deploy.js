'use strict';

var gulp     = require('gulp');
var del      = require('del').sync;
var through2 = require('through2');
var notifier = require('node-notifier');
var useref   = require('gulp-useref');
var git      = require("./lib/git");

var $package = {};

var src   = "prod";
var clean = ["prod/.git", "prod/**/*"];

var repo   = "";
var branch = "prod";

module.exports = {
  setConfig,
  init,
  push
};

/**
 * @param {CmBuilderConfig} config
 */
function setConfig(config) {
  repo     = config.repo;
  branch   = config.branch;
  $package = config.package || $package;
}

function init() {
  if (!repo) throw mainError(new TypeError('Repository not set'));

  del(clean);
  return gulp
    .src(src)
    .pipe(initPipe())
    .on('error', mainError);

}

function push() {
  if (!repo) throw mainError(new TypeError('Repository not set'));

  return gulp
    .src(`${src}/index.html`)
    .pipe(pushPipe())
    .on('error', mainError);

}

function initPipe() {
  return through2.obj(execute);

  function execute(chunk, enc, callback) {
    var pipe = this;

    git.config('./prod');
    git.init()
       .then(git.addRemote.bind(git, repo))
       .then(git.fetch)
       .then(git.checkout.bind(git, branch))
       .then(success, error);

    function success() {
      pipe.push(chunk);
      callback();
    }

    function error(err) {
      callback(err);
    }
  }
}

function pushPipe() {
  return through2.obj(execute);

  function execute(chunk, enc, callback) {
    var pipe = this;

    git.config('./prod');
    git.commit(`version ${$package.version}`)
       .then(git.push.bind(git, branch))
       .then(success, error);

    function success() {
      pipe.push(chunk);
      callback();
    }

    function error(err) {
      callback(err);
    }
  }
}

function mainError(e) {
  var msg = e.message;
  console.error(msg);
  notifier.notify({
    title  : 'Build Error',
    message: msg,
    sound  : true
  });
  this.emit('end');
}