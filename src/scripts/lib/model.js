(function () {
  'use strict';

  angular.module("tas.lib.model", []).service('tasModel', tasModel);
  /**
   * @class tasModel
   * @constructor
   */
  function tasModel() {
    this.update = update;
    this.enum   = enumFixer;

    /**
     * @methodOf tasModel
     */
    function update(dest, src, structure) {
      if (!dest) return null;
      src = src || {};
      Object.keys(structure).forEach(setup);

      function setup(key) {
        var defaultValue = structure[key];
        if (Array.isArray(defaultValue)) return updateArr(key);
        if (typeof defaultValue == 'function') return setByConstructor(key);
        if (typeof defaultValue != 'object') return setProperty(key);
        if (defaultValue === null) return setProperty(key);
        if (!dest.hasOwnProperty(key)) dest[key] = {};
        update(dest[key], src[key], defaultValue);
      }

      function setProperty(key) {
        var defaultValue = structure[key];
        if (src.hasOwnProperty(key)) return dest[key] = src[key];
        if (!dest.hasOwnProperty(key)) return dest[key] = defaultValue;
      }

      function updateArr(key) {
        var defaultValue = structure[key][0];
        dest[key]        = dest[key] || [];
        var arr          = dest[key];
        var Constructor  = false;
        if (typeof defaultValue == 'function') Constructor = defaultValue;

        if (src[key]) {
          if (!Array.isArray(src[key])) return fillArr(arr, [factory(src[key])]);
          return fillArr(arr, src[key].map(factory));
        }
        if (!dest.hasOwnProperty(key)) return fillArr(arr, []);
        return arr;

        function factory(value) {
          return Constructor ? new Constructor(value) : value;
        }
      }

      function setByConstructor(key) {
        var Constructor = structure[key];
        if (src.hasOwnProperty(key)) return dest[key] = new Constructor(src[key]);
        if (!dest.hasOwnProperty(key)) return dest[key] = new Constructor();
        return dest[key];
      }
    }

    /**
     * @methodOf tasModel
     * @name enum
     * @param {String} value
     * @param {String[]} possibles
     */
    function enumFixer(value, possibles) {
      if (~possibles.indexOf(value)) return value;
      return null;
    }
  }

  function fillArr(arr, src) {
    [].splice.apply(arr, [0, arr.length].concat(src));
    return arr;
  }

})();