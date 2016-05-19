const errors = require('./errors');

module.exports = {
  addMappings
}

/**
  Used to add mappings of the childHealthBenefit into the master_screener
  @param {Object} masterMapping - addMappings will add the properties for the
                                  childHealthBenefit to this object. This should be
                                  the properties object nested inside the mapping
                                  body. reference: https://blog.raananweber.com/2015/11/24/simple-autocomplete-with-elasticsearch-and-node-js/
  @param {Object} screenerMapping - the mappings that will be added to the master.
  @param {string} screenerName - the name of the screener currently be added to the master.
 */
function addMappings(masterMapping, screenerMapping, screenerName) {
  // iterate over object properties
  // http://stackoverflow.com/a/16735184/764384
  for(const prop in screenerMapping) {
    if(screenerMapping.hasOwnProperty(prop)){
      if (masterMapping.hasOwnProperty(prop) && masterMapping[prop].type !== screenerMapping[prop].type) {
        throw Error(errors.propMultTypeError(screenerMapping[prop], masterMapping[prop], prop, screenerName));
      } else if (masterMapping.hasOwnProperty(prop) && masterMapping[prop].type === screenerMapping[prop].type) {
        // no need to add a mapping that already exists and doesn't have conflicting type
        continue;
      }
      // add the screenerMapping to the masterMapping
      masterMapping[prop] = screenerMapping[prop];
    }
  }
}
