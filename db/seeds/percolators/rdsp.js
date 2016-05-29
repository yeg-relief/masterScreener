const queries = generateQueries();
module.exports = {
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
