(function () {
  'use strict';

  ngApp.component('cmAlert', {
    templateUrl: '/scripts/modules/layout/components/cmAlert/cmAlert.html',
    bindings   : {
      resolve: '<',
      close  : '&'
    },
    controller : controller
  });

  function controller($sce) {
    var ctrl = this;

    this.icoName  = this.resolve.icoName;
    this.icoColor = this.resolve.icoColor || '#919d9e';
    this.htmlBody = $sce.trustAsHtml(this.resolve.htmlBody);
  }
})();