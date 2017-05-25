(function () {
  'use strict';

  ngApp.component('myHomePage', {
    templateUrl: '/scripts/modules/common/components/myHomePage/myHomePage.html',
    bindings   : {},
    controller : controller
  });
  /**
   * @param $q
   * @param {log} log
   * @param {Bootstrap} Bootstrap
   */
  function controller($q, log, Bootstrap) {
    var ctrl = this;

    this.loading = true;

    Bootstrap.load().then(loadStep1).then(init).catch(log.error);

    function loadStep1() {
      return $q.all([
        null
      ]);
    }

    function init(res) {
      ctrl.loading = false;
    }
  }

})();