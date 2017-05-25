(function () {
  'use strict';

  tasCollection.prototype.clear   = clear;
  tasCollection.prototype.filter  = filter;
  tasCollection.prototype.sort    = sort;
  tasCollection.prototype.find    = find;
  tasCollection.prototype.first   = first;
  tasCollection.prototype.remove  = remove;
  tasCollection.prototype.forEach = forEach;
  tasCollection.prototype.some    = some;
  tasCollection.prototype.reduce  = reduce;
  tasCollection.prototype.map     = map;
  tasCollection.prototype.get     = get;
  tasCollection.prototype.has     = has;
  tasCollection.prototype.set     = set;

  angular.module("tas.lib.collection", []).value('tasCollection', tasCollection);
  /**
   * @class tasCollection
   * @property {Array} _arr
   * @property {Number} size
   * @constructor
   */
  function tasCollection() {
    Object.defineProperties(this, {
      _arr: {value: []},
      size: {value: 0, writable: true}
    });
  }

  /**
   * @methodOf tasCollection
   */
  function clear() {
    var collection = this;
    this._arr.splice(0, this._arr.length);
    Object.keys(this).forEach(fn);

    function fn(key) {
      delete collection[key];
    }

    this.size = 0;
  }

  /**
   * @methodOf tasCollection
   */
  function filter(callback, thisArg) {
    return this._arr.filter(callback, thisArg);
  }

  /**
   * @methodOf tasCollection
   */
  function sort(callback, thisArg) {
    return this._arr.sort(callback, thisArg);
  }

  /**
   * @methodOf tasCollection
   */
  function find(callback, thisArg) {
    return this._arr.find(callback, thisArg);
  }

  /**
   * @methodOf tasCollection
   */
  function first() {
    return this._arr[0];
  }

  /**
   * @methodOf tasCollection
   */
  function reduce(callback, initialValue) {
    return this._arr.reduce(callback, initialValue);
  }

  /**
   * @methodOf tasCollection
   */
  function map(callback, initialValue) {
    return this._arr.map(callback, initialValue);
  }

  /**
   * @methodOf tasCollection
   */
  function remove(key) {
    if (!this.has(key)) return false;
    var item  = this[key];
    var index = this._arr.indexOf(item);
    this._arr.splice(index, 1);
    delete this[key];
    this.size--;
    return item;
  }

  /**
   * @methodOf tasCollection
   */
  function forEach(callback, thisArg) {
    return this._arr.forEach(callback, thisArg);
  }

  /**
   * @methodOf tasCollection
   */
  function some(callback, thisArg) {
    return this._arr.some(callback, thisArg);
  }

  /**
   * @methodOf tasCollection
   */
  function get(key) {
    return this[key];
  }

  /**
   * @methodOf tasCollection
   */
  function has(key) {
    return this.hasOwnProperty(key);
  }

  /**
   * @methodOf tasCollection
   */
  function set(key, value) {
    if (!this.has(key)) {
      this.size++;
      this._arr.push(value);
      this[key] = value;
      return value;
    }
    var old   = this[key];
    var index = this._arr.indexOf(old);
    this._arr.splice(index, 1, value);
    this[key] = value;
    return value;
  }

})();