const screenerName = 'Child Health Benefit';

/**
  these are the objects that are required for the mappings in the
  childHealthBenefit.
 */
const screenerMappings = {
  income: {type: "integer"},
  commonLaw: {type: "boolean"},
  numChildren: {type: "integer"},
  children: {type: "boolean"}
}

const screener = Object.assign({}, {screenerName: screenerName}, {screenerMappings: screenerMappings});
const queries = generateQueries();

module.exports = {
  screener,
  queries
}

function generateQueries(){
  const singleOneChild =
  {
    id: 'child_health_benefit_s1',
    query: {
      "constant_score" : {
        "filter" : {
          "bool" : {
            "must" : [
              { "term" : {"children" : true } },
              { "term" : {"numChildren" : 1 } },
              { "term" : {"commonLaw" : false} },
              {"range" : {"income": {"lte" : 26023}} }
            ]
          }
        }
      }
    }
  }

  let queries = [];
  queries.push(singleOneChild);
  return queries;
}
