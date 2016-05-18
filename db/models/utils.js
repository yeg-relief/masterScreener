module.exports = {
  addMappings
}

/**
  Used to add mappings of the childHealthBenefit into the master_screener
  @param {Object} masterProps -   addMappings will add the properties for the
                                  childHealthBenefit to this object. This should be
                                  the properties object nested inside the mapping
                                  body. reference: https://blog.raananweber.com/2015/11/24/simple-autocomplete-with-elasticsearch-and-node-js/
  @param {Object} screenerMappings - the mappings that will be added to the master.
  @param {string} screenerName - the name of the screener currently be added to the master.
 */
function addMappings(masterProps, screenerMappings, screenerName) {
  for(const prop in screenerMappings) {
    if(screenerMappings.hasOwnProperty(prop)){
      if (masterProps.hasOwnProperty(prop) && masterProps.prop.type !== screenerMappings.prop.type) {
        throw Error(propMultTypeError(screenerMappings.prop, masterProps.prop, prop, screenerName));
      }
      Object.assign(masterProps, screenerMappings.prop);
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
  return `
  Error in screener: ${screenerName},
  master screener has prop: ${propName},
  with type: ${masterProp.type},
  ${screenerName} has prop: ${propName},
  with type: ${screenerProp.type}
  `
}
