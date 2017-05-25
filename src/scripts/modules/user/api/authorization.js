(function () {
  'use strict';

  ngApp.service('AuthorizationAPI', AuthorizationAPI);
  /**
   * @class AuthorizationAPI
   * @constructor
   */
  function AuthorizationAPI($q, tasApi) {
    this.signIn = signIn;

    /**
     * @methodOf AuthorizationAPI
     * @param {String} login
     * @param {String} password
     * @returns {Promise.<Object>}
     */
    function signIn(login, password) {
      return $q.resolve({
        id        : 1,
        JSESSIONID: 'qwer'
      });
      // return tasApi.post('login', {
      //   username: login,
      //   password: password
      // }, 'post:sign:in');
    }

  }

})();