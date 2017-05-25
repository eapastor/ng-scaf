(function () {
  'use strict';

  ngApp.service('Utils', Utils);
  /**
   * @class Utils
   */
  function Utils() {
    var date  = {
      today: dateToday
    };

    this.date = date;

    this.rewriteArray         = rewriteArray;
    this.filterAndValidateArr = filterAndValidateArr;


    /**
     * @methodOf Utils.date
     * @name today
     */
    function dateToday() {
      var now   = new Date();
      var year  = now.getFullYear();
      var month = now.getMonth() + 1;
      var day   = now.getDate();
      return new Date([month, day, year].join('-'));
    }

    /**
     * @methodOf Utils
     * @param {Array} src
     * @param {Array} arr
     * @returns {Array}
     */
    function rewriteArray(src, arr) {
      [].splice.apply(src, [0, src.length].concat(arr));
      return src;
    }

    /**
     * @methodOf Utils
     * @param {Array} arr
     * @param {Function} filter
     * @param {Function, null, optional} allValidCallback
     * @param {Function, null, optional} hasErrorsCallback
     * @param {*, optional} thisArg
     * @returns {Array}
     */
    function filterAndValidateArr(arr, filter, allValidCallback, hasErrorsCallback, thisArg) {
      var filtered = arr.filter(filter, thisArg);
      if (filtered.length == arr.length) {
        allValidCallback && allValidCallback();
      } else {
        hasErrorsCallback && hasErrorsCallback();
      }
      return filtered;
    }
  }

})();
