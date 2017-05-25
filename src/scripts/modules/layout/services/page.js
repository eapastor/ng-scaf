(function () {
  'use strict';

  ngApp.service('Pages', Pages);
  /**
   * @class Pages
   * @property {Object} data
   * @property {String} data.section
   * @property {String} section
   * @param $location
   * @param {VS} VS
   * @constructor
   */
  function Pages($location, VS) {
    Object.defineProperties(this, {
      data   : {get: getData},
      section: {get: getSection}
    });

    this.goHome     = goHome;
    this.goSignIn   = goSignIn;
    this.getHomeUrl = getHomeUrl;

    /**
     * @methodOf Pages
     */
    function goHome() {
      $location.url(getHomeUrl());
    }

    /**
     * @methodOf Pages
     */
    function goSignIn() {
      $location.url('/signin');
    }

    /**
     * @methodOf Pages
     */
    function getHomeUrl() {
      var user = VS.user.current;
      if (!user) return '/';
      return '/hello';
    }

    function getData() {
      var route = {};
      return route.nav || {};
    }

    function getSection() {
      return getData().section || 'home';
    }
  }

})();
