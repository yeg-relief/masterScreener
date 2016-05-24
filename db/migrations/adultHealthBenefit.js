const screenerName = 'Adult Health Benefit';

const screenerMappings = {
  income: {type: "integer"},
  commonLaw: {type: "boolean"},
}

const screener = Object.assign({}, {screenerName: screenerName}, {screenerMappings: screenerMappings});
const queries = generateQueries();

module.exports = {
  screener,
  queries
}

function generateQueries(){
  let queries = [];
  queries.push(generateQuery('s', false, 16580));
  queries.push(generateQuery('c', true, 23212));
  return queries;
}

function generateQuery(id, commonLaw, income){
  return {
    id: `adult_health_benefit_${id}`,
    query: {
      "constant_score" : {
        "filter" : {
          "bool" : {
            "must" : [
              { "term" : {"commonLaw" : commonLaw} },
              { "range" : {"income": {"lte" : income}} }
            ]
          }
        }
      }
    }
  }
}
