(function () {
  'use strict';

  ngApp.factory('User', factory);

  function factory(tasModel) {
    /**
     * @type {User}
     */
    var structure = {
      id   : null,
      email: null,
      name : null
    };

    User.prototype.update = update;

    return User;

    /**
     * @class User
     *
     * @property {String} id
     * @property {String} email
     * @property {String} name
     *
     * @property {Object} _ui
     *
     * @property {Object} _display
     * @property {String} _display.name
     * @constructor
     */
    function User(data) {
      data = data || {};

      Object.defineProperties(this, {
        _ui     : {value: {}},
        _display: {value: {}}
      });

      update.call(this, data);
    }

    /**
     * @methodOf User
     * @param {User} data
     * @this {User}
     */
    function update(data) {
      tasModel.update(this, data, structure);
      this._display.name = this.name;
      return this;
    }
  }

})();
