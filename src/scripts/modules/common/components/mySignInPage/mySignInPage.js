(function () {
  'use strict';

  ngApp.component('mySignInPage', {
    templateUrl: '/scripts/modules/common/components/mySignInPage/mySignInPage.html',
    bindings   : {},
    controller : controller
  });
  /**
   * @param {Bootstrap} Bootstrap
   * @param {Authorization} Authorization
   * @param {Pages} Pages
   * @param {Alert} Alert
   */
  function controller(Bootstrap, Authorization, Pages, Alert) {
    var ctrl   = this;

    this.login     = '';
    this.password  = '';

    this.signIn = signIn;

    if (Authorization.check()) Pages.goHome();

    function signIn() {
      Authorization.signIn(ctrl.login, ctrl.password).then(success, error);

      function success() {
        Bootstrap.reset();
        Pages.goHome();
      }

      function error(err) {
        Alert.danger('times-circle-o', 'Ошибка входа');
      }
    }

    // ================> Defines functions <================

    // ================> Utils functions <==================

  }

})();