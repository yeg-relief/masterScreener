'use strict';
const
assert = require('chai').assert,
index  = require('./index');

/**
  match response pushes descriptions for the various ids returned by percolating
  a user submission.
*/
describe('models.index.matchResponse', () => {
  it('should return a vsaq item using id child_health_benefit_s1', () => {
    // TODO: study before, beforeEach etc
    const id = 'child_health_benefit_s1';
    let items = [];
    index.matchResponse(id, items);
    assert.strictEqual(items.length, 1);
    // copy+pasted from models/ChildHealthBenefit
    const expected = {
      "type": "tip",
      "id": "ChildHealthBenefit",
      "text": '<a href="http://www.humanservices.alberta.ca/financial-support/2076.html">More Details</a>',
      "warn": "yes",
      "name": "<b>Alberta Child Health Benefit</b>",
      "severity": "high"
    }
    assert.deepEqual(items[0], expected);
  });

  it('should not push duplicates', () => {
    const id = 'child_health_benefit_s1';
    let items = [];
    index.matchResponse(id, items);
    assert.strictEqual(items.length, 1);
    index.matchResponse(id, items);
    assert.strictEqual(items.length, 1);
  })
});
