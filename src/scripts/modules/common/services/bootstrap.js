(function () {
  'use strict';

  ngApp.service('Bootstrap', Bootstrap);
  /**
   * @class Bootstrap
   * @param $q
   * @param {Session} Session
   * @param {Pages} Pages
   * @param {Users} Users
   * @param {Authorization} Authorization
   * @constructor
   */
  function Bootstrap($q, Session, Pages, Users, Authorization) {
    // ================> Methods <==========================
    this.load  = load;
    this.reset = reset;

    // ================> Methods functions <================
    /**
     * @methodOf Bootstrap
     * @return {*}
     */
    function load() {
      if (load.processing) return load.processing;
      if (load.success) return $q.resolve(load.success);

      return load.processing = new $q(loader).catch(error);
    }

    /**
     * @methodOf Bootstrap
     * @return {*}
     */
    function reset() {
      load.success = null;
      return load();
    }

    // ================> Utils functions <==================
    function loader(resolve, reject) {
      var userId = Session.get('my-user-id');
      if (!userId) throw new TypeError('USER_SESSION_ERROR');

      return step1().then(success, reject);

      function step1() {
        return $q.all([
          Users.load(userId)
        ]);
      }

      function success(res) {
        var user = res[0];
        if (!user) throw new TypeError('USER_SESSION_ERROR');

        Users.setCurrent(user);

        load.success    = res;
        load.processing = null;

        resolve(res);
      }
    }

    function error(err) {
      load.error      = err;
      load.processing = null;
      Authorization.signOut();
      Pages.goSignIn();
      throw err;
    }

  }

})();