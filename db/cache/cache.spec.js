'use strict';
const
assert = require('chai').assert,
expect = require('chai').expect,
Cache  = require('./cache').Class,
client = require('./mockClient').mockClient,
expectedCache = require('./mockClient').expectedCache;

describe('Cache class', () => {


  const cache = new Cache(client);
  it('contains a default Map named memory', () => {
    assert.typeOf(cache.memory, 'Map');
  });

  // mock data encapsulated in mockClient.js
  it('should have data loaded by the constructor', () => {
    assert.deepEqual(cache.memory, expectedCache);
  });

  it('has a function called get', () => {
    assert.typeOf(cache.get, 'Function');
  });

})
