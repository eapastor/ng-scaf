(function () {
  'use strict';

  ngApp.service('Cookies', Cookies);
  /**
   * @class Cookies
   * @constructor
   */
  function Cookies() {
    // ================> Prepare <==========================
    // ================> Variables <========================
    // ================> Objects <==========================
    // ================> Methods <==========================
    this.set      = set;
    this.get      = get;
    this.remove   = remove;
    this.clear    = clear;
    this.nextYear = nextYear;

    // ================> Defines <==========================
    // ================> Init <=============================
    // ================> Methods functions <================

    /**
     * @methodOf Cookies
     * @param {String} name
     * @param {String} value
     * @param {Object, optional} options
     * @param {String} options.path
     * @param {String} options.domain
     * @param {String} options.max-age
     * @param {Date, String} options.expires
     * @param {String} options.secure
     */
    function set(name, value, options) {
      options = options || {};

      var expires = options.expires;
      if (!options.hasOwnProperty('path')) options.path = '/';
      if (expires && expires.toUTCString) options.expires = expires.toUTCString();
      value = encodeURIComponent(value);

      document.cookie = Object.keys(options).reduce(update, name + "=" + value);

      function update(cookie, prop) {
        cookie += "; " + prop;
        if (options[prop] !== true) cookie += "=" + options[prop];
        return cookie;
      }
    }

    /**
     * @methodOf Cookies
     * @param {String} name
     */
    function get(name) {
      var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    /**
     * @methodOf Cookies
     * @param {String} name
     */
    function remove(name) {
      var time = new Date();
      time.setHours(time.getHours() - 1);

      set(name, null, {expires: time});
    }

    /**
     * @methodOf Cookies
     */
    function clear() {
      document.cookie.split('; ').forEach(rm);

      function rm(item) {
        remove(item.split('=')[0])
      }
    }

    /**
     * @methodOf Cookies
     */
    function nextYear() {
      var now   = new Date();
      var years = now.getFullYear();
      now.setFullYear(years + 1);
      return now;
    }

    // ================> Custom functions <=================

  }

})();