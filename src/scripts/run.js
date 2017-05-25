(function () {
  'use strict';

  ngApp.run(run);
  function run($rootScope, $location, $http, Authorization) {
    $rootScope.$on('$routeChangeStart', changeRoute);
    $http.defaults.headers.post['Content-Type'] = 'application/json';

    function changeRoute($event, next, current) {
      if (next.$$route && next.$$route.authorization && !Authorization.check()) {
        $location.path('/signin');
      }
    }

  }

})();