(function () {
  'use strict';

  ngApp.component('mySecondItemPage', {
    templateUrl: '/scripts/modules/common/components/mySecondItemPage/mySecondItemPage.html',
    bindings   : {},
    controller : controller
  });
  /**
   * @param $routeParams
   * @param $http
   * @param {log} log
   * @param {Bootstrap} Bootstrap
   */
  function controller($routeParams, $http, log, Bootstrap) {
    var ctrl = this;
    var id   = $routeParams.id;

    ctrl.loading = true;
    ctrl.item    = null;
    ctrl.id      = id;

    Bootstrap.load().then(loadStep1).then(init).catch(log.error);

    function loadStep1() {
      // Заглушка всегда возвращающая одно и то же значение
      return {
        data: {
          id  : id,
          name: 'Item Name'
        }
      };

      // Для запроса к серверу использовать закоментированнный код
      // return $http.request({
      //   method: 'GET',
      //   url   : `/api/item/${id}`
      // });
    }

    function init(res) {
      ctrl.item    = res.data;
      ctrl.loading = false;
    }
  }

})();