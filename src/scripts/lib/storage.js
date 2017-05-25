(function () {
  'use strict';

  angular.module("tas.lib.storage", ["tas.lib.collection"]).service('tasStorage', tasStorage);
  /**
   * @class tasStorage
   * @param {tasCollection} tasCollection
   * @constructor
   */
  function tasStorage(tasCollection) {
    Object.defineProperties(this, {
      get: {value: get}
    });

    /**
     * @methodOf tasStorage
     * @param name
     * @returns {tasCollection}
     */
    function get(name) {
      if (!this.hasOwnProperty(name)) this[name] = new tasCollection();
      return this[name];
    }
  }

})();