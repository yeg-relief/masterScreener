const screenerName = 'Child Health Benefit';

/**
  these are the objects that are required for the master_screener mappings w.r.t.
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

/**
  https://drive.google.com/open?id=0B3DMBJXZKmZ5UHhXVWhDWk9JWEU
  Alberta Child Health Benefit
  notice there are multiple queries that must be stored.
  TODO: consider how many queries to construct, ie "*for each additional child add $4793"
  @return {Array[Object]}
 */
function generateQueries(){
  let queries = [];
  queries.push(generateQuery('s1', 1, false, 26023));
  queries.push(generateQuery('s2', 2, false, 31010));
  queries.push(generateQuery('s3', 3, false, 36325));
  queries.push(generateQuery('s4', 4, false, 41957));
  queries.push(generateQuery('c1', 1, true, 31237));
  queries.push(generateQuery('c2', 2, true, 36634));
  queries.push(generateQuery('c3', 3, true, 41594));
  queries.push(generateQuery('c4', 4, true, 46932));
  return queries;
}

/**
  The child health benefit has multiple tiers depending on couple or single status,
  income and number of children. This is a template of the query. It will be called
  itteratively to generate the full set of appropriate queries.
  @param {string} id - a tag appended to a base string 'child_health_benefit_' to represent id
  @param {int} numChildren - the number of children involved in the benefit
  @param {boolean} commonLaw - a bool representing if there is a common law relationship (single of not)
  @param {int} income - the income of the person/couple
  @return {Object}
 */
function generateQuery(id, numChildren, commonLaw, income){
  return {
    id: `child_health_benefit_${id}`,
    query: {
      "constant_score" : {
       "filter" : {
         "bool" : {
           "must" : [
             { "term" : {"children" : true } },
             { "term" : {"numChildren" : numChildren}},
             { "term" : {"commonLaw" : commonLaw} },
             { "range" : {"income": {"lte" : income}} }
           ]
         }
       }
     }
   }
 }
}
