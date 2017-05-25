(function () {
  'use strict';

  ngApp.component('myOperationPage', {
    templateUrl: '/scripts/modules/common/components/myOperationPage/myOperationPage.html',
    bindings   : {},
    controller : controller
  });
  /**
   * @param $q
   * @param $routeParams
   * @param $sce
   * @param tasApi
   * @param {log} log
   * @param {Bootstrap} Bootstrap
   */
  function controller($q, $routeParams, $sce, tasApi, log, Bootstrap) {
    var ctrl = this;
    var id   = $routeParams.id;
    var md   = new showdown.Converter();

    this.loading   = true;
    this.operation = null;
    this.result    = null;
    this.payload   = null;

    Bootstrap.load().then(loadStep1).then(loadStep2).then(init).catch(log.error);

    function loadStep1() {
      return $q.all([
        tasApi.query(`operation/${id}`, null, 'off')
      ]);
    }

    function loadStep2(res) {
      var operation = res[0];

      return $q.all([
        operation,
        operation.resultId ? tasApi.query(`operation-result/${operation.resultId}`, null, 'off') : null
      ]);
    }

    function init(res) {
      ctrl.operation = res[0];
      ctrl.result    = res[1];
      ctrl.payload   = $sce.trustAsHtml(md.makeHtml(ctrl.result.payload));
      ctrl.loading   = false;
    }
  }

})();