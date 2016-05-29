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
    type: "master",
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
