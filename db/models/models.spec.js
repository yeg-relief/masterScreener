'use strict';
const
expect = require('chai').expect,
utils  = require('./utils');

describe('addMappings', function() {
  /*
    Every individual screener has certain mappings such that when these
    individual mappings are composed we arrive at the type mapping required for
    the master screener.

    https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html
    https://drive.google.com/file/d/0B3DMBJXZKmZ5UHhXVWhDWk9JWEU/view?usp=sharing

    technical reference for chai error assetion:
    http://stackoverflow.com/questions/19097067/chai-expecting-an-error-or-not-depending-on-a-parameter/19150023#19150023
   */
  it('should thow an error if there is a mapping collision involving different types', function() {
    const masterProp = {type: "boolean"};
    const screenerProp = {type: "string"};
    const screenerMapping = {fieldOne: screenerProp};
    const masterMapping = {fieldOne: masterProp};
    const screenerName = "badScreener";
    const propName = "fieldOne";

    expect(function() {
      utils.addMappings(masterMapping, screenerMapping, screenerName);
    }).to.throw(`
    Error in screener: ${screenerName},
    master screener has prop: ${propName},
    with type: ${masterProp.type},
    ${screenerName} has prop: ${propName},
    with type: ${screenerProp.type}
    `);
  })
});
