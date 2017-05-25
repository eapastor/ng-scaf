'use strict';

var notifier = require('node-notifier');

module.exports = factory;

function factory(title) {
  return function (err) {
    var msg = err.message;
    console.error(msg);
    notifier.notify({
      title  : title,
      message: msg,
      sound  : true
    });
    this.emit('end');
  }
}