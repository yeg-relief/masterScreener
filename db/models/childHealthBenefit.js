const screenerName = 'Child Health Benefit';

/**
  these are the objects that are required for the mappings in the
  childHealthBenefit.
 */
const screenerMappings = {
  income: {type: "integer"},
  commonLaw: {type: "boolean"},
  numChildren: {type: "integer"}
}

const screener = Object.assign({}, {screenerName: screenerName}, {screenerMappings: screenerMappings});
const query = Object.assign({})


module.exports = {
  screener
}
