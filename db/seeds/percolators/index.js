const
adultHealthBenefit = require('./adultHealthBenefit').queries,
childHealthBenefit = require('./childHealthBenefit').queries,
rdsp               = require('./rdsp').queries,
resp               = require('./resp').queries;

const queries = gatherQueries();
module.exports = queries;

function gatherQueries() {
  let queries = [];
  queries.push(childHealthBenefit);
  queries.push(resp)
  queries.push(adultHealthBenefit);
  queries.push(rdsp);
  // http://stackoverflow.com/a/10865042/764384
  return [].concat.apply([], queries);
}
