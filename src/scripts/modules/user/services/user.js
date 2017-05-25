(function () {
  'use strict';

  ngApp.service('Users', Users);
  /**
   * @class Users
   * @param tasStorage
   * @param {VS} VS
   * @param {User} User
   * @param {UserAPI} UserAPI
   * @constructor
   */
  function Users(tasStorage, VS, User, UserAPI) {
    var collection = tasStorage.get('users');

    this.load       = load;
    this.setCurrent = setCurrent;

    /**
     * @methodOf Users
     * @param {String} id
     */
    function load(id) {
      return UserAPI.load(id).then(factory);
    }

    /**
     * @methodOf Users
     * @param {User|null} user
     */
    function setCurrent(user) {
      VS.user.current = user || null;
    }

    function factory(data) {
      if (collection.has(data.id)) return collection.get(data.id).update(data);
      return collection.set(data.id, new User(data));
    }

  }

})();