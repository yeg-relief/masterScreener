'use strict';
const
assert = require('chai').assert,
expect = require('chai').expect,
Cache  = require('./cache').Class;

const elasticsearch = require('elasticsearch'),
      client        = new elasticsearch.Client({host: 'localhost:9200'})

describe('Cache class', () => {

  it('contains a default Map named memory', () => {
    const cache = new Cache(client);
    assert.typeOf(cache.memory, 'Map');
  });

  it('has a function called get', () => {
    const cache = new Cache(client);
    assert.typeOf(cache.get, 'Function');
  });

  it('has a function called set', () => {
    const cache = new Cache(client);
    assert.typeOf(cache.set, 'Function')
  });

  it('has a function called loadInitial', () => {
    const cache = new Cache(client);
    assert.typeOf(cache.loadInitial, 'Function')
  });

  it('is able to be initialized with data', () => {
    const cache = new Cache(client)
    return cache.loadInitial()
          .then( cache => assert.equal(cache.memory.size > 0, true))
  });

  // this test requires that there is a program called 'resp' to be in the database
  it('returns an array with the responses in memory', () => {
    const cache = new Cache(client);
    return cache.loadInitial()
           .then(cache => cache.get(['resp']))
           .then( res => assert.deepEqual(res, [cache.memory.get('resp')]))
  });

  it('returns an empty array when all are missed', () => {
    const cache = new Cache(client);
    return cache.get(['miss'])
           .then( resp => assert.deepEqual(resp, []))
  });

  it('will fetch missed gets', () => {
    const cache = new Cache(client);
    let expected;
    return cache.loadInitial()
           .then(cache => {
             expected = cache.memory.get('resp');
             cache.delete('resp');
             return Promise.resolve(cache);
           })
           .then(cache => {return Promise.resolve(cache.get(['resp']))})
           .then(res => assert.deepEqual([expected], res))
  });

  it('will combine values in memory with fetched values', () => {
    const cache = new Cache(client);
    const expected = [];
    return cache.loadInitial()
           .then(cache => {
             expected.push(cache.memory.get('rdsp'));
             expected.push(cache.memory.get('resp'));
             cache.delete('resp');
             return Promise.resolve(cache);
           })
           .then(cache => {return Promise.resolve(cache.get(['resp', 'rdsp']))})
           .then(res => assert.deepEqual(expected, res))
  })
})
