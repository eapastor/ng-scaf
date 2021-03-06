(function () {
  'use strict';

  ngApp.component('mySecondPage', {
    templateUrl: '/scripts/modules/common/components/mySecondPage/mySecondPage.html',
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
    ctrl.items   = [];
    ctrl.id      = id;

    Bootstrap.load().then(loadStep1).then(init).catch(log.error);

    function loadStep1() {
      // Заглушка всегда возвращающая одно и то же значение
      return {
        data: [
          {
            id  : 1,
            name: 'Item Name'
          }, {
            id  : 2,
            name: 'Item Name'
          }, {
            id  : 3,
            name: 'Item Name'
          }
        ]
      };

      // Для запроса к серверу использовать закоментированнный код
      // return $http.request({
      //   method: 'GET',
      //   url   : `/api/item/${id}`
      // });
    }

    function init(res) {
      ctrl.items   = res.data;
      ctrl.loading = false;
    }
  }

})();