const queries = generateQueries();
module.exports = {
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
    type: "master",
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
