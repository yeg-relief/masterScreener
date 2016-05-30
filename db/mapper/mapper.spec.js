'use strict';
const
assert = require('chai').assert,
expect = require('chai').expect,
index  = require('./index'),
errors = require('./errors');

/*
  Every individual screener has certain mappings such that when these
  individual mappings are composed we arrive at the type mapping required for
  the master screener.

  https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html
  https://drive.google.com/file/d/0B3DMBJXZKmZ5UHhXVWhDWk9JWEU/view?usp=sharing

  technical reference for chai error assetion:
  http://stackoverflow.com/questions/19097067/chai-expecting-an-error-or-not-depending-on-a-parameter/19150023#19150023
 */
describe('db.mapper.index.addMappings', function() {
  it('should thow an error if there is a mapping collision involving different types', function() {
    const
    masterProp = {type: "boolean"},
    screenerProp = {type: "string"},
    screenerMapping = Object.assign({},{fieldOne: screenerProp}),
    masterMapping = Object.assign({},{fieldOne: masterProp}),
    screenerName = "badScreener",
    errorString = errors.propMultTypeError(masterMapping, screenerMapping, screenerName);

    expect(function() {
      index.addMappings(masterMapping, screenerMapping, screenerName);
    }).to.throw(errorString);
  });

  it('should not throw an error for a mapping collision of same type', function() {
    const
    masterProp = {type: "boolean"},
    screenerProp = {type: "boolean"},
    screenerMapping = Object.assign({},{fieldOne: screenerProp}),
    masterMapping = Object.assign({},{fieldOne: masterProp}),
    screenerName = "goodScreener";

    // ensure no error is thown
    expect(function() {
      index.addMappings(masterMapping, screenerMapping, screenerName);
    }).to.not.throw();
    // ensure that the master mapping did not change
    const expectedMasterMapping = Object.assign({}, masterMapping);
    assert.deepEqual(expectedMasterMapping, masterMapping);
  });

  it('if master does not have a mapping in the screener, this mapping should be added to master', function(){
    const
    masterProp = {type: "boolean"},
    screenerProp = {type: "boolean"},
    screenerMapping = Object.assign({},{fieldTwo: screenerProp}),
    screenerName = "goodScreener";

    let masterMapping = Object.assign({},{fieldOne: masterProp});

    // ensure no error is thown
    expect(function() {
      index.addMappings(masterMapping, screenerMapping, screenerName);
    }).to.not.throw();

    // ensure that the master mapping was assigned fieldTwo from screener mapping
    const expectedMasterMapping = Object.assign({}, screenerMapping, masterMapping);
    assert.deepEqual(expectedMasterMapping, masterMapping);
  });
});
