(function () {
  'use strict';

  ngApp.service('log', log);
  /**
   * @class log
   * @constructor
   */
  function log() {
    this.error = error;

    function error() {
      return console.error.apply(null, arguments);
    }
  }
})();