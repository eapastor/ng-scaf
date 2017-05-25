(function () {
  'use strict';

  ngApp.service('Authorization', Authorization);
  /**
   * @class Authorization
   * @constructor
   */
  function Authorization(UserAPI, Session, Users) {
    this.isSignIn      = false;
    this.check         = check;
    this.signIn        = signIn;
    this.signOut       = signOut;
    this.resetPassword = resetPassword;

    /**
     * @methodOf Authorization
     * @return {Boolean}
     */
    function check() {
      return this.isSignIn = Session.get('JSESSIONID') && Session.get('cm-user-id');
    }

    /**
     * @methodOf Authorization
     * @param {String} login
     * @param {String} password
     * @returns {Promise.<Boolean>} успешность
     */
    function signIn(login, password) {
      return UserAPI.signIn(login, password).then(userHandler, error);

      function userHandler(user) {
        Session.set('JSESSIONID', user.JSESSIONID);
        Session.set('cm-user-id', user.id);
        return user;
      }

      function error(err) {
        signOut();
        throw err;
      }
    }

    /**
     * @methodOf Authorization
     */
    function signOut() {
      Users.setCurrent(null);
      Session.remove('JSESSIONID');
      Session.remove('cm-user-id');
    }

    function resetPassword(login) {
      return UserAPI.resetPassword(login);
    }
  }

})();