'use strict';
const
assert = require('chai').assert,
expect = require('chai').expect,
Cache  = require('./cache').Class,
client = require('./mockClient').mockClient,
setValue = require('./mockClient').setValue,
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

  it('has a function called set', () => {
    assert.typeOf(cache.set, 'Function')
  })

  it('returns an array with the responses in memory', () => {
    const responses = cache.get(['resp'])
    assert.deepEqual(responses, [expectedCache['resp']])
  });

  it('returns an empty array when all are missed', () => {
    const responses = cache.get(['miss'])
    assert.deepEqual(responses, [])
  })

  it('sets a value in the memory', () => {
    const success = cache.set(setValue);
    assert.equal(success, true);
    const responses = cache.get(['resp', 'test'])
    assert.deepEqual(responses, [expectedCache['resp'], setValue])
  })
})
