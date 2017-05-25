(function () {
  'use strict';

  ngApp.component('myNavbar', {
    templateUrl: '/scripts/modules/common/components/myNavbar/myNavbar.html',
    bindings   : {},
    controller : controller
  });
  /**
   * @param {Pages} Pages
   * @param {Authorization} Authorization
   * @param {VS} VS
   */
  function controller(Pages, Authorization, VS) {
    var links = [
      {name: 'Главная', url: '/', section: 'home', disabled: false},
      {name: 'Spellbooks', url: '/spellbooks', section: 'spellbooks', disabled: false},
      {name: 'Operations', url: '/operations', section: 'operations', disabled: false}
    ];

    this.links = links;
    this.page  = Pages;
    this.auth  = Authorization;
    this.user  = VS.user;

    this.signOut = signOut;

    Authorization.check();

    function signOut() {
      Authorization.signOut();
      Pages.goSignIn();
    }
  }

})();