(function () {
  'use strict';

  ngApp.component('mySignInPage', {
    templateUrl: '/scripts/modules/common/components/mySignInPage/mySignInPage.html',
    bindings   : {},
    controller : controller
  });
  /**
   * @param cmFlagsControl
   * @param {Bootstrap} Bootstrap
   * @param {Authorization} Authorization
   * @param {Pages} Pages
   * @param {Alert} Alert
   */
  function controller(cmFlagsControl, Bootstrap, Authorization, Pages, Alert) {
    var ctrl   = this;
    var errors = new cmFlagsControl({
      login   : () => this.submitted && !this.login,
      password: () => this.submitted && !this.password
    });

    this.login     = '';
    this.password  = '';
    this.submitted = false;

    this.errors = errors;

    this.signIn = signIn;
    this.change = change;

    if (Authorization.check()) Pages.goHome();

    function signIn() {
      ctrl.submitted = true;
      // if (errors.$check()) return;

      Authorization.signIn(ctrl.login, ctrl.password).then(success, error);

      function success() {
        Bootstrap.reset();
        Pages.goHome();
      }

      function error(err) {
        Alert.danger('times-circle-o', 'Ошибка входа');
      }
    }

    function change() {
      errors.$check();
    }

    // ================> Defines functions <================

    // ================> Utils functions <==================

  }

})();