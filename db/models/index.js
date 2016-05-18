const
childHealthBenefit = require('./childHealthBenefit'),
utils              = require('./utils'),
errors             = require('./errors');

module.exports = {
  generateMasterMapping,
  gatherScreenerMappings
}

/**
  calls addMappings for each individual screener and returns the master mapping
  @param {Array[Object]} screeners - An array containing all the individual screeners.
  @return {Object}
 */

function generateMasterMapping(screeners) {
  let masterMapping = {};
  console.log(screeners);
  screeners.forEach((element, index, array) => {
    console.log(masterMapping);
    console.log(element.screenerMappings);
    console.log(element.screenerName);
    utils.addMappings(masterMapping, element.screenerMappings, element.screenerName);
  });
  return masterMapping;
}

/**
  pushes all the screener mappings into one array, so that generateMasterMapping
  has something to itteratively call utils.addMappings(...) with.
  @return {Array[Object]}
 */
function gatherScreenerMappings() {
  let mappings = [];
  mappings.push(childHealthBenefit.screener);
  return mappings;
}
