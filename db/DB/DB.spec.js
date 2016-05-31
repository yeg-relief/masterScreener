'use strict';
const
assert = require('chai').assert,
expect = require('chai').expect,
DB  = require('./index').Class;

const elasticsearch = require('elasticsearch'),
      client        = new elasticsearch.Client({host: 'localhost:9200'})

describe('DB class', () => {

  it('contains a default Map named memory', () => {
    const db = new DB(client);
    assert.typeOf(db.memory, 'Map');
  });

  it('has a function called get', () => {
    const db = new DB(client);
    assert.typeOf(db.get, 'Function');
  });

  it('has a function called set', () => {
    const db = new DB(client);
    assert.typeOf(db.set, 'Function')
  });

  it('has a function called loadInitial', () => {
    const db = new DB(client);
    assert.typeOf(db.loadInitial, 'Function')
  });

  it('is able to be initialized with data', () => {
    const db = new DB(client)
    return db.loadInitial()
          .then( db => assert.equal(db.memory.size > 0, true))
  });

  // this test requires that there is a program called 'resp' to be in the database
  it('returns an array with the responses in memory', () => {
    const db = new DB(client);
    return db.loadInitial()
           .then(db => db.get(['resp']))
           .then( res => assert.deepEqual(res, [db.memory.get('resp')]))
  });

  it('returns an empty array when all are missed', () => {
    const db = new DB(client);
    return db.get(['miss'])
           .then( resp => assert.deepEqual(resp, []))
  });

  it('will fetch missed gets', () => {
    const db = new DB(client);
    let expected;
    return db.loadInitial()
           .then(db => {
             expected = db.memory.get('resp');
             db.delete('resp');
             return Promise.resolve(db);
           })
           .then(db => {return Promise.resolve(db.get(['resp']))})
           .then(res => assert.deepEqual([expected], res))
  });

  it('will combine values in memory with fetched values', () => {
    const db = new DB(client);
    const expected = [];
    return db.loadInitial()
           .then(db => {
             expected.push(db.memory.get('rdsp'));
             expected.push(db.memory.get('resp'));
             db.delete('resp');
             return Promise.resolve(db);
           })
           .then(db => {return Promise.resolve(db.get(['resp', 'rdsp']))})
           .then(res => {
             // fetched values will be saved in memory notice the delete on line 72
             assert.deepEqual(db.memory.get('resp'), expected[1])
             return Promise.all(res);
           })
           .then(res => assert.deepEqual(expected, res))
  })
})
