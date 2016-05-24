const screenerName = 'Disability Tax Credit';

/**
  these are the objects that are required for the master_screener mappings w.r.t.
  childHealthBenefit.
 */
const screenerMappings = {
  disablityTaxCredit: {type: "boolean"}
}

const screener = Object.assign({}, {screenerName: screenerName}, {screenerMappings: screenerMappings});
const queries = generateQueries();

module.exports = {
  screener,
  queries
}

function generateQueries(){
  let queries = [];
  queries.push(generateQuery());
  return queries;
}

function generateQuery(){
  return {
    id: `rdsp`,
    query: {
      "constant_score" : {
        "filter" : {
          "bool" : {
            "must" : [
              { "term" : {"disablityTaxCredit" : true} }
            ]
          }
        }
      }
    }
  }
}
