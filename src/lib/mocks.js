(function () {
  'use strict';


  angular.module("tas.lib.mocks", ["tas.lib.collection"]).service('tasMocks', tasMocks).run(run);
  /**
   * @class tasMocks
   * @property {tasCollection} simple
   * @property {tasCollection} entity
   * @param $q
   * @param $timeout
   * @param {tasCollection} tasCollection
   */
  function tasMocks($q, $timeout, tasCollection) {
    var mocks    = this;
    var handlers = new tasCollection();
    var simple   = new tasCollection();
    var entity   = new tasCollection();

    this.handlers = handlers;
    this.simple   = simple;
    this.entity   = entity;

    this.generator   = generator;
    this.set         = set;
    this.fakePromise = fakePromise;

    /**
     * @methodOf tasMocks
     */
    function generator(category, name, handler) {
      mocks[category].set(name, handler);
    }

    /**
     * @methodOf tasMocks
     */
    function set(name, handler) {
      mocks.handlers.set(name, handler);
    }

    /**
     * @methodOf tasMocks
     */
    function fakePromise(time) {
      return new $q(promise);

      function promise(resolve) {
        $timeout(resolve, time);
      }
    }
  }

  /**
   * Init base mocks
   * @param {tasMocks} tasMocks
   */
  function run(tasMocks) {
    tasMocks.generator('simple', 'id', id);
    tasMocks.generator('simple', 'uuid', uuid);
    tasMocks.generator('simple', 'hash', hash);
    tasMocks.generator('simple', 'real', real);
    tasMocks.generator('simple', 'random', random);
    tasMocks.generator('simple', 'bool', bool);
    tasMocks.generator('simple', 'arr', arr);
    tasMocks.generator('simple', 'name', name);
    tasMocks.generator('simple', 'text', text);
    tasMocks.generator('simple', 'email', email);
    tasMocks.generator('simple', 'phone', phone);
    tasMocks.generator('simple', 'desc', desc);
    tasMocks.generator('simple', 'date', date);
    tasMocks.generator('simple', 'image', image);
    tasMocks.generator('simple', 'properties', properties);
    tasMocks.generator('simple', 'geoPoint', geoPoint);
    tasMocks.generator('simple', 'geoPoints', geoPoints);

    /**
     * @methodOf Mocks.simple
     */
    function id(number) {
      if (number) return number;
      return real(0, 10000);
    }

    /**
     * @methodOf Mocks.simple
     */
    function uuid(id) {
      if (id) return id;
      return [hash(8), hash(4), hash(4), hash(4), hash(12)].join('-');
    }

    /**
     * @methodOf Mocks.simple
     */
    function hash(length) {
      return Math.floor((1 + Math.random()) * Math.pow(16, length))
                 .toString(16)
                 .substring(1);
    }

    /**
     * @methodOf Mocks.simple
     * @param {Number, optional} limit0
     * @param {Number, optional} limit1
     */
    function real(limit0, limit1) {
      var max = arguments[1] ? arguments[1] : arguments[0];
      var min = arguments[1] ? arguments[0] : 0;
      return Math.round(Math.random() * (max - min)) + min;
    }

    /**
     * @methodOf Mocks.simple
     */
    function bool() {
      return Math.random() > 0.5;
    }

    /**
     * @methodOf Mocks.simple
     */
    function random(arr) {
      if (typeof arr == 'undefined') return hash(real(4, 16));
      if (!arr.hasOwnProperty('length')) arr = arguments;
      var count = arr.length;
      if (!count) return 'error';
      var key = Math.floor(Math.random() * count);
      return arr[key];
    }

    /**
     * @methodOf Mocks.simple
     */
    function arr(count, factory) {
      var result = [];
      for (var i = 0; i < count; i++) {
        result.push(factory(i));
      }
      return result;
    }

    /**
     * @methodOf Mocks.simple
     */
    function name(text) {
      if (!text) return hash(random(4, 8));
      return [text, hash(random(4, 8))].join(' ');
    }

    /**
     * @methodOf Mocks.simple
     */
    function text(text) {
      var base  = text ? [text] : [];
      var parts = arr(real(1, 3), part);
      return base.concat(parts).join(' ');

      function part() {
        return hash(random(4, 8));
      }
    }

    /**
     * @methodOf Mocks.simple
     */
    function email(name, host, domain) {
      if (!name) name = hash(real(1, 2) * 4);
      if (!host) host = hash(real(1, 2) * 4);
      if (!domain) domain = hash(2);
      return name + '@' + host + '.' + domain;
    }

    /**
     * @methodOf Mocks.simple
     */
    function phone() {
      return ['+7', '(' + real(100, 999) + ')', [real(100, 999), real(10, 99), real(10, 99)].join('-')].join(' ');
    }

    /**
     * @methodOf Mocks.simple
     */
    function desc() {
      var base  = ['Description'];
      var parts = arr(real(1, 8), part);
      return base.concat(parts).join(' ');

      function part() {
        return hash(random(4, 8, 16));
      }
    }

    /**
     * @methodOf Mocks.simple
     */
    function date(from) {
      var yearFrom  = from ? from.getFullYear() : 2014;
      var year      = real(yearFrom, 2022);
      var monthFrom = (from && (year > yearFrom)) ? from.getMonth() + 1 : 1;
      var month     = real(monthFrom, 12);
      var dayFrom   = (from && (year > yearFrom) && (month > monthFrom)) ? from.getDate() : 1;
      var day       = real(dayFrom, 28);
      return new Date([month, day, year].join('.'));
    }

    /**
     * @methodOf Mocks.simple
     */
    function image(w, h) {
      return "http://placehold.it/${w}x${h}".replace('${w}', w).replace('${h}', h);
    }

    /**
     * @methodOf Mocks.simple
     * @param {Object} data
     */
    function properties(data) {
      return Object.keys(data).map(factory, data);

      function factory(key) {
        var value = this[key];
        return new PropertyMock(key, value);
      }

      /**
       * @param name
       * @param value
       * @constructor
       */
      function PropertyMock(name, value) {
        this.name  = name;
        this.value = value;
      }
    }

    /**
     * @methodOf Mocks.simple
     * @param {Object, optional} value
     */
    function geoPoint(value) {
      if (value) return value;
      return {
        lat: +('59.' + real(10000, 99999)),
        lng: +('30.' + real(10000, 99999))
      };
    }

    /**
     * @methodOf Mocks.simple
     * @param {Array, optional} value
     */
    function geoPoints(value) {
      if (value) return value;
      return arr(real(0, 5), geoPoint);
    }
  }

})();