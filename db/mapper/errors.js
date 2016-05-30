module.exports = {
  propMultTypeError
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
