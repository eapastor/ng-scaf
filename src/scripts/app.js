(function () {
  'use strict';

  /**
   * @namespace {angular.Module} ngApp
   */
  window.ngApp = angular.module('my.app', ['ngRoute', 'ui.bootstrap', 'cm.lib']);
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
        template      : '<cm-home-page></cm-home-page>',
        reloadOnSearch: true,
        authorization : true,
        nav           : {
          section: 'home'
        }
      })
      .when('/signin', {
        template      : '<cm-sign-in-page></cm-sign-in-page>',
        reloadOnSearch: true,
        authorization : false,
        nav           : {
          section: 'signin'
        }
      })
      .when('/spellbooks', {
        template      : '<cm-spellbooks-page></cm-spellbooks-page>',
        reloadOnSearch: true,
        authorization : true,
        nav           : {
          section: 'spellbooks'
        }
      })
      .when('/spellbook/new', {
        template      : '<cm-spellbook-new-page></cm-spellbook-new-page>',
        reloadOnSearch: true,
        authorization : true,
        nav           : {
          section: 'spellbooks'
        }
      })
      .when('/spellbook/:id', {
        template      : '<cm-spellbook-page></cm-spellbook-page>',
        reloadOnSearch: true,
        authorization : true,
        nav           : {
          section: 'spellbooks'
        }
      })
      .when('/operations', {
        template      : '<cm-operations-page></cm-operations-page>',
        reloadOnSearch: true,
        authorization : true,
        nav           : {
          section: 'operations'
        }
      })
      .when('/operation/:id', {
        template      : '<cm-operation-page></cm-operation-page>',
        reloadOnSearch: true,
        authorization : true,
        nav           : {
          section: 'operations'
        }
      })
      .otherwise({
        template      : `<cm-not-found-page></cm-not-found-page>`,
        reloadOnSearch: true,
        authorization : false,
        nav           : {
          section: 'error'
        }
      });

  }

})();