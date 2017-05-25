'use strict';

class Config {

  constructor() {
    this.env   = 'prod';
    this.mocks = false;
    this.gMaps = {key: ''};

    Object.seal(this);
  }

  init(data) {
    if (!data) return;
    updateProperty.call(this, 'env', data);
    updateProperty.call(this, 'mocks', data);
    updateProperty.call(this, 'gMaps', data);
  }
}

module.exports = new Config();

function updateProperty(prop, data) {
  if (!this) return;
  if (data.hasOwnProperty(prop)) this[prop] = data[prop];
}