(function () {
  'use strict';


  angular.module("tas.lib.http", ["tas.lib.mocks", "tas.lib.config"]).service('tasHttp', tasHttp);
  /**
   * @class tasHttp
   * @param $q
   * @param $http
   * @param cmConfig
   * @param {tasMocks} tasMocks
   */
  function tasHttp($q, $http, cmConfig, tasMocks) {
    var API = cmConfig.api;

    this.request           = request;
    this.multipart         = multipart;
    this.url               = url;
    this.setCredentials    = setCredentials;
    this.removeCredentials = removeCredentials;

    /**
     * @methodOf tasHttp
     */
    function request(properties, force) {
      if (!force) properties.url = [API, properties.url].join('/');
      log(properties);

      if (tasMocks.handlers.has(properties.mock)) return mock(properties);

      return $http(properties).then(transformResponse);
    }

    /**
     * @methodOf tasHttp
     */
    function multipart(properties, force) {
      if (!force) properties.url = [API, properties.url].join('/');
      log(properties);

      if (tasMocks.handlers.has(properties.mock)) return mock(properties);

      return multipartRequest(properties, force).then(transformResponse);
    }

    /**
     * @methodOf tasHttp
     */
    function mock(properties) {
      var handler = tasMocks.handlers.get(properties.mock);
      var data    = handler({}, properties.data);
      return $q.resolve(data);
    }

    /**
     * @methodOf tasHttp
     */
    function url() {
      return Array.prototype.join.call(arguments, '/');
    }

    /**
     * @methodOf tasHttp
     * @param {String} token
     */
    function setCredentials(token) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + token;
    }

    /**
     * @methodOf tasHttp
     */
    function removeCredentials() {
      delete $http.defaults.headers.common['Authorization'];
    }

    function log(properties) {
      if (cmConfig.env != 'dev') return;
      console.groupCollapsed('%chttp:%c %s%c %s %c%s',
        'color: #860043', 'color: #004386; font-weight: bold', properties.method,
        'color: #000000; font-weight: normal', properties.url, 'color: #00a986', properties.mock);
      console.log(properties);
      console.groupEnd();
    }

    function multipartRequest(properties, force) {
      var formData = new FormData();
      var data     = properties.data;

      if (typeof data != 'object') throw new Error('Data must be an Object');

      Object.keys(data).forEach(setFormData, data);

      properties.method  = 'POST';
      properties.headers = {'Content-Type': undefined};
      properties.data    = formData;

      return $http(properties);

      function setFormData(key) {
        var data   = this;
        var values = data[key];
        if (!Array.isArray(values)) values = [values];
        values.forEach(append);

        function append(value) {
          formData.append(key, value);
        }
      }
    }

    function transformResponse(res) {
      return res.data;
    }

  }

})();