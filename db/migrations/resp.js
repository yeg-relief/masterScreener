const screenerName = 'RESP: Canadian Learning Bond';

const screenerMappings = {
  income: {type: "integer"},
  bornAfterDate: {type: "boolean"},
  children: {type: "boolean"}
}

const screener = Object.assign({}, {screenerName: screenerName}, {screenerMappings: screenerMappings});
const queries = generateQueries();

module.exports = {
  screener,
  queries
}

/**
  https://drive.google.com/open?id=0B3DMBJXZKmZ5UHhXVWhDWk9JWEU
  @return {Array[Object]}
 */
function generateQueries(){
  let queries = [];
  queries.push(generateQuery());
  return queries;
}

/**
  @return {Object}
 */
function generateQuery(){
  return {
    id: `resp`,
    query: {
      "constant_score" : {
        "filter" : {
          "bool" : {
            "must" : [
              { "term" : {"children" : true } },
              { "range" : {"income": {"lte" : 44701}}},
              { "term" : {"bornAfterDate": true} }
            ]
          }
        }
      }
    }
  }
}
