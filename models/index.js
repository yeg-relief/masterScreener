const
scrubber            = require('./submitScrubber'),
utils               = require('../db/utils'),
childHBmatcher      = require('./childHealthBenefit').matcher,
respMatcher         = require('./resp').matcher,
rdspMatcher         = require('./rdsp').matcher,
adultHBmatcher      = require('./adultHealthBenefit').matcher,
masterScreener      = require('./masterScreener').questionaire;

/*
 TODO:  consider if this is the proper module for these functions
        these functions being the ones that are related to the
        transformation and percolation of client submissions
        and formating server response.
*/
module.exports = {
  scrubber,
  screenSubmission,
  masterScreener,
  matchResponse
}

/**
  Run a "scrubbed" or transformed client submission against the indexed
  percolators
  @param {Object} clientSubmission - A submission from the client expected to be for masterScreener at this point
  @param {Object} elasticClient - driver for elasticsearch
  @return {Object}
*/
function screenSubmission(clientSubmission, elasticClient) {
  return utils.percolateDocument(elasticClient, 'master_screener', 'master', clientSubmission);
}

const matcher = buildMatcher();
function buildMatcher() {
  matchAll = Object.create(null);
  Object.assign(matchAll, childHBmatcher);
  Object.assign(matchAll, respMatcher);
  Object.assign(matchAll, adultHBmatcher);
  Object.assign(matchAll, rdspMatcher);
  for(const prop in matchAll){
    console.log(`matchAll has prop ${prop}`);
  }
  return matchAll;
}

/**
  After the client submission has been run against the percolators we need
  to respond to the matches. We will use an object literal in order to push the
  appropriate object into an items array. The items array will be used to construct
  a vsaq questionaire.
  reference: https://toddmotto.com/deprecating-the-switch-statement-for-object-literals/
  @param {string} id - the id from the match.id field elasticSearch response
  @param {Array[Object]} items - an array of vsaq "tip" objects used to render server response on client
*/
function matchResponse(id, items) {
  console.log('========================');
  console.log(id);
  const descr = matcher[id](items);
  console.log(descr.id);
  console.log('=========================');
  items.push(descr);
}
