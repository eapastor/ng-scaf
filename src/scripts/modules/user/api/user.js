(function () {
  'use strict';

  ngApp.service('UserAPI', UserAPI);
  /**
   * @class UserAPI
   * @constructor
   */
  function UserAPI($q, tasHttp, tasApi) {
    this.load   = load;
    this.signIn = signIn;

    /**
     * @methodOf UserAPI
     * @param {String} id
     * @returns {Promise.<Object>}
     */
    function load(id) {
      return $q.resolve({
        id   : id,
        email: 'admin@cardsmobile.ru',
        name : 'Admin'
      });
      // return tasApi.load(`users/${id}`, 'get:user');
    }

    /**
     * @methodOf UserAPI
     * @param {String} login
     * @param {String} password
     * @returns {Promise.<Object>}
     */
    function signIn(login, password) {
      return $q.resolve({
        id        : 1,
        JSESSIONID: 'qwer'
      });
      // return tasHttp.request({
      //   method: 'POST',
      //   url   : 'login',
      //   data  : {
      //     username: login,
      //     password: password
      //   },
      //   mock  : 'post:sign:in'
      // });
    }

    /**
     * @methodOf UserAPI
     * @param {String} login (email)
     * @returns {Promise.<Object>}
     */
    function resetPassword(login) {
      return tasHttp.request({
        method: 'POST',
        url   : tasHttp.url('/users/resetPassword'),
        data  : `"${login}"`
      });
    }

  }

})();