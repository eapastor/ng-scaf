(function () {
  'use strict';

  ngApp.service('Session', Session);
  /**
   * @class Session
   * @constructor
   */
  function Session(Cookies) {
    this.set    = set;
    this.get    = get;
    this.remove = remove;

    /**
     * @methodOf Session
     * @param {String} key
     * @param {String, Number} value
     */
    function set(key, value) {
      sessionStorage.setItem(key, value);
      Cookies.set(key, value);
    }

    /**
     * @methodOf Session
     * @param {String} key
     */
    function get(key) {
      var value = sessionStorage.getItem(key);
      if (value == null) value = Cookies.get(key);
      return value;
    }

    /**
     * @methodOf Session
     * @param {String} key
     */
    function remove(key) {
      sessionStorage.removeItem(key);
      Cookies.remove(key);
    }
  }

})();