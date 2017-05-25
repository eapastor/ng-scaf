(function () {
  'use strict';

  /**
   * @namespace {angular.Module} ngApp
   */
  window.ngApp = angular.module('my.app', ['ngRoute', 'ui.bootstrap', 'tas.lib']);
  ngApp.config(config);
  function config($qProvider, $compileProvider, $locationProvider, $routeProvider) {
    $qProvider.errorOnUnhandledRejections(false);
    $compileProvider.debugInfoEnabled(false);
    $compileProvider.commentDirectivesEnabled(false);
    $compileProvider.cssClassDirectivesEnabled(false);
    $compileProvider.preAssignBindingsEnabled(true);

    $locationProvider.html5Mode({
      enabled    : true,
      requireBase: false
    });

    $routeProvider
      .when('/', {
        template      : '<my-home-page></my-home-page>',
        reloadOnSearch: true,
        authorization : true,
        nav           : {
          section: 'home'
        }
      })
      .when('/signin', {
        template      : '<my-sign-in-page></my-sign-in-page>',
        reloadOnSearch: true,
        authorization : false,
        nav           : {
          section: 'signin'
        }
      })
      .when('/second', {
        template      : '<my-second-page></my-second-page>',
        reloadOnSearch: true,
        authorization : true,
        nav           : {
          section: 'second'
        }
      })
      .when('/second/:id', {
        template      : '<my-second-item-page></my-second-item-page>',
        reloadOnSearch: true,
        authorization : true,
        nav           : {
          section: 'second'
        }
      })
      .otherwise({
        template      : `<my-not-found-page></my-not-found-page>`,
        reloadOnSearch: true,
        authorization : false,
        nav           : {
          section: 'error'
        }
      });

  }

})();