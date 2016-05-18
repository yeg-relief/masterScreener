module.exports = {
  addMappings,
  propMultTypeError
}

/**
  Used to add mappings of the childHealthBenefit into the master_screener
  @param {Object} masterMapping -   addMappings will add the properties for the
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
        throw Error(propMultTypeError(screenerMapping[prop], masterMapping[prop], prop, screenerName));
      } else if (masterMapping.hasOwnProperty(prop) && masterMapping[prop].type === screenerMapping[prop].type) {
        // no need to add a mapping that already exists
        continue;
      }
      // add the screenerMapping to the masterMapping
      masterMapping[prop] = screenerMapping[prop];
    }
  }
}


/**
  generates error message in case there is already a property assigned in master screener
  @param {Object} prop - local Screener property that is involved in collision.
  @param {Object} prop - master Screener property that is involved in collision.
  @param {string} propName - the name of the property in collision.
  @param {string} screenerName - the name of the screener where the collsion occured.
  @return {string}
 */
function propMultTypeError(screenerProp, masterProp, propName, screenerName) {
  return new String(`Error in screener: ${screenerName}\n` +
  `master screener has prop: ${propName}\n` +
  `with type: ${masterProp.type}\n` +
  `${screenerName} has prop: ${propName}\n` +
  `with type: ${screenerProp.type}`);
}
