'use strict';

var builder   = require('./builder');
var $package  = require('./package.json');
var $uiConfig = require('./src/scripts/config.json');
var flags     = require('node-flags');

var ng = Object.assign($uiConfig.cmConfig, {
  env  : getFlag('env') || 'prod',
  mocks: getFlag('mocks')
});

builder.init({
  fonts   : [
    "bower_components/font-awesome/fonts/**",
    "src/fonts/**"
  ],
  files   : [
    "src/files/**"
  ],
  repo    : $package.config.deploy.repository,
  branch  : $package.config.deploy.branch,
  package : $package,
  settings: $package.config,
  flags   : ng,
  ng      : ng
});

function getFlag(name) {
  if (process.env.hasOwnProperty(`npm_config_${name}`)) return process.env[`npm_config_${name}`];
  return flags.get(name);
}