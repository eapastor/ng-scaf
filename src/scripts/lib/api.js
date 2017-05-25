(function () {
  'use strict';

  angular.module("tas.lib.api", ["tas.lib.http"]).service('tasApi', tasApi);
  /**
   * @class tasApi
   * @param {tasHttp} tasHttp
   * @constructor
   */
  function tasApi(tasHttp) {
    this.get    = get;
    this.post   = post;
    this.put    = put;
    this.delete = _delete;
    this.query  = query;
    this.load   = load;
    this.create = create;
    this.update = update;
    this.remove = remove;

    /**
     * @methodOf tasApi
     * @param {String, String[]} url
     * @param {Object, null} params
     * @param {String} mock
     * @param {Boolean, optional} multipart
     * @param {Boolean, optional} force
     * @returns {Promise.<Array.<*>>}
     */
    function get(url, params, mock, multipart, force) {
      if (Array.isArray(url)) url = url.join('/');
      var options = {
        method: 'GET',
        url   : tasHttp.url(url),
        params: params,
        mock  : mock
      };
      if (multipart) return tasHttp.multipart(options, force);
      return tasHttp.request(options, force);
    }

    /**
     * @methodOf tasApi
     * @param {String, String[]} url
     * @param {Object, null} data
     * @param {String} mock
     * @param {Boolean, optional} multipart
     * @param {Boolean, optional} force
     * @returns {Promise.<Array.<*>>}
     */
    function post(url, data, mock, multipart, force) {
      if (Array.isArray(url)) url = url.join('/');
      var options = {
        method: 'POST',
        url   : tasHttp.url(url),
        params: data,
        mock  : mock
      };
      if (multipart) return tasHttp.multipart(options, force);
      return tasHttp.request(options, force);
    }

    /**
     * @methodOf tasApi
     * @param {String, String[]} url
     * @param {Object, null} data
     * @param {String} mock
     * @param {Boolean, optional} multipart
     * @param {Boolean, optional} force
     * @returns {Promise.<Array.<*>>}
     */
    function put(url, data, mock, multipart, force) {
      if (Array.isArray(url)) url = url.join('/');
      var options = {
        method: 'PUT',
        url   : tasHttp.url(url),
        params: data,
        mock  : mock
      };
      if (multipart) return tasHttp.multipart(options, force);
      return tasHttp.request(options, force);
    }

    /**
     * @methodOf tasApi
     * @name delete
     * @param {String, String[]} url
     * @param {Object, null} data
     * @param {String} mock
     * @param {Boolean, optional} multipart
     * @param {Boolean, optional} force
     * @returns {Promise.<Array.<*>>}
     */
    function _delete(url, data, mock, multipart, force) {
      if (Array.isArray(url)) url = url.join('/');
      var options = {
        method: 'DELETE',
        url   : tasHttp.url(url),
        params: data,
        mock  : mock
      };
      if (multipart) return tasHttp.multipart(options, force);
      return tasHttp.request(options, force);
    }

    /**
     * @methodOf tasApi
     * @param {String, String[]} url
     * @param {Object, null} params
     * @param {String} mock
     * @param {Boolean, optional} multipart
     * @param {Boolean, optional} force
     * @returns {Promise.<Array.<*>>}
     */
    function query(url, params, mock, multipart, force) {
      if (Array.isArray(url)) url = url.join('/');
      var options = {
        method: 'GET',
        url   : tasHttp.url(url),
        params: params,
        mock  : mock
      };
      if (multipart) return tasHttp.multipart(options, force);
      return tasHttp.request(options, force);
    }

    /**
     * @methodOf tasApi
     * @param {String, String[]} url
     * @param {String} mock
     * @param {Boolean, optional} multipart
     * @param {Boolean, optional} force
     * @returns {Promise.<*>}
     */
    function load(url, mock, multipart, force) {
      if (Array.isArray(url)) url = url.join('/');
      var options = {
        method: 'GET',
        url   : tasHttp.url(url),
        mock  : mock
      };
      if (multipart) return tasHttp.multipart(options, force);
      return tasHttp.request(options, force);
    }

    /**
     * @methodOf tasApi
     * @param {String, String[]} url
     * @param {Object, null} data
     * @param {String} mock
     * @param {Boolean, optional} multipart
     * @param {Boolean, optional} force
     * @returns {Promise.<*>}
     */
    function create(url, data, mock, multipart, force) {
      if (Array.isArray(url)) url = url.join('/');
      var options = {
        method: 'POST',
        url   : tasHttp.url(url),
        data  : data,
        mock  : mock
      };
      if (multipart) return tasHttp.multipart(options, force);
      return tasHttp.request(options, force);
    }

    /**
     * @methodOf tasApi
     * @param {String, String[]} url
     * @param {Object, null} data
     * @param {String} mock
     * @param {Boolean, optional} multipart
     * @param {Boolean, optional} force
     * @returns {Promise.<*>}
     */
    function update(url, data, mock, multipart, force) {
      if (Array.isArray(url)) url = url.join('/');
      var options = {
        method: 'PUT',
        url   : tasHttp.url(url),
        data  : data,
        mock  : mock
      };
      if (multipart) return tasHttp.multipart(options, force);
      return tasHttp.request(options, force);
    }

    /**
     * @methodOf tasApi
     * @param {String, String[]} url
     * @param {String} mock
     * @param {Boolean, optional} multipart
     * @param {Boolean, optional} force
     * @returns {Promise.<*>}
     */
    function remove(url, mock, multipart, force) {
      if (Array.isArray(url)) url = url.join('/');
      var options = {
        method: 'DELETE',
        url   : tasHttp.url(url),
        mock  : mock
      };
      if (multipart) return tasHttp.multipart(options, force);
      return tasHttp.request(options, force);
    }
  }
})();