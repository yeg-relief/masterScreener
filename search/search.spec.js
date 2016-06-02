'use strict';
const
assert       = require('chai').assert,
Search       = require('./index').Class,
input        = require('./search.data_spec').input,
expected     = require('./search.data_spec').expected,
processInput = require('./index').helpers.processInput;

const elasticsearch = require('elasticsearch'),
      client        = new elasticsearch.Client({host: 'localhost:9200'});

describe('Search class', () => {
  describe('Search class helpers', () => {
    it('a helper to processInput', () => {
      assert.deepEqual(processInput(input[0]), expected[0]);
    })
  });

  it('it can percolate a submission', () => {
    const search = new Search(client);
    return search
           .screenSubmission(input[0])
           .then( hits => {
             assert.deepEqual(hits, expected[1]);
           })
  });

  it('will return an empty array for empty input', () => {
    const search = new Search(client);
    return search
           .screenSubmission({})
           .then( hits => {
             assert.deepEqual(hits, []);
           })
  })
})
