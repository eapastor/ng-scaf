'use strict';

var exec    = require('child_process').exec;
var options = {
  cwd: './prod'
};

module.exports = {
  config,
  init,
  addRemote,
  fetch,
  checkout,
  commit,
  push
};

function config(path) {
  options.cwd = path;
}

function init() {
  return executor(`git init`, options);
}

function addRemote(repo) {
  return executor(`git remote add origin ${repo}`, options);
}

function fetch() {
  return executor(`git fetch`, options);
}

function checkout(branch) {
  return executor(`git checkout -b ${branch} origin/${branch}`, options);
}

function commit(message) {
  return executor(`git add .`, options).then(step2);

  function step2() {
    return executor(`git commit -m "${message}"`, options);
  }
}

function push(branch) {
  return executor(`git push origin ${branch}`, options);
}

function executor(cmd, options) {
  return new Promise(run);

  function run(resolve, reject) {
    exec(cmd, options, callback);

    function callback(error, stdout, stderr) {
      if (error) return reject(error);
      resolve(stdout);
    }
  }
}