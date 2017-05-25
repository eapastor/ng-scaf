(function () {
  'use strict';

  ngApp.service('VS', VS);
  /**
   * @class VS
   * @property {User|null} user
   * @constructor
   */
  function VS() {
    this.user = {
      current: null
    };
  }

})();